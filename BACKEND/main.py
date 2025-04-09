from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from typing import List, Optional
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a MySQL
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Cmqt1234",  
            database="gestioncitasmedicas"
        )
        return conn
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al conectar a MySQL: {e}")

# Modelos 
class Usuario(BaseModel):
    nombre: str
    apellido: str
    email: str
    telefono: Optional[str]
    contrasena: str
    rol: str
    cedula: str  

class Medico(BaseModel):
    id_usuario: int
    especialidad: str

class Paciente(BaseModel):
    id_usuario: int
    fecha_nacimiento: str
    historial_medico: Optional[str]

class Cita(BaseModel):
    id_paciente: int
    id_medico: int
    fecha_hora: str
    estado: Optional[str] = "Pendiente"
    notas: Optional[str]

class LoginRequest(BaseModel):
    email: str
    contrasena: str

class Cita(BaseModel):
    fecha_hora: str
    estado: Optional[str] = "Pendiente"
    notas: Optional[str]


# Verificar conexión a la base de datos
@app.get("/verificar-conexion")
def verificar_conexion():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE()")
        db_name = cursor.fetchone()
        conn.close()

        if db_name and db_name[0]:
            return {"mensaje": "Conexión a la base de datos exitosa", "base_de_datos": db_name[0]}
        else:
            return {"mensaje": "Conexión exitosa, pero el nombre no se pudo obtener"}
    
    except Error as e:
        return {"error": str(e)}
    

# LOGIN
@app.post("/login/")
def login_usuario(login_data: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT contrasena FROM usuarios WHERE email = %s", (login_data.email,))
    usuario = cursor.fetchone()
    
    conn.close()

    if usuario:
        if usuario["contrasena"] == login_data.contrasena:
            return {"mensaje": "Acceso aprobado"}
        else:
            raise HTTPException(status_code=401, detail="Credenciales inválidas")
    else:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

# CRUD  Usuarios 
@app.get("/usuarios/", response_model=List[dict])
def obtener_usuarios():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id_usuario, nombre, apellido, email, telefono, rol, cedula FROM usuarios")
    usuarios = cursor.fetchall()
    conn.close()
    return usuarios

@app.get("/usuarios/{cedula}")
def obtener_usuario_por_cedula(cedula: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT id_usuario, nombre, apellido, email, telefono, rol, cedula FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    conn.close()
    
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return usuario

@app.post("/usuarios/")
def crear_usuario(usuario: Usuario):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE email = %s OR cedula = %s", (usuario.email, usuario.cedula))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="El email o la cédula ya están registrados")

    sql = "INSERT INTO usuarios (nombre, apellido, email, telefono, contrasena, rol, cedula) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    valores = (usuario.nombre, usuario.apellido, usuario.email, usuario.telefono, usuario.contrasena, usuario.rol, usuario.cedula)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Usuario creado con éxito"}

@app.put("/usuarios/{cedula}")
def actualizar_usuario(cedula: str, usuario: Usuario):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "UPDATE usuarios SET nombre=%s, apellido=%s, email=%s, telefono=%s, contrasena=%s, rol=%s WHERE cedula=%s"
    valores = (usuario.nombre, usuario.apellido, usuario.email, usuario.telefono, usuario.contrasena, usuario.rol, cedula)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Usuario actualizado con éxito"}

@app.delete("/usuarios/{cedula}")
def eliminar_usuario(cedula: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuarios WHERE cedula = %s", (cedula,))
    conn.commit()
    conn.close()
    return {"mensaje": "Usuario eliminado con éxito"}

# CRUD  Médicos 
@app.get("/medicos/", response_model=List[dict])
def obtener_medicos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT m.id_medico, u.cedula, u.nombre, u.apellido, m.especialidad
        FROM medicos m
        JOIN usuarios u ON m.id_usuario = u.id_usuario
    """)

    medicos = cursor.fetchall()
    conn.close()
    return medicos

@app.get("/medicos/{cedula}")
def obtener_medico_por_cedula(cedula: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT m.id_medico, u.cedula, u.nombre, u.apellido, m.especialidad
        FROM medicos m
        JOIN usuarios u ON m.id_usuario = u.id_usuario
        WHERE u.cedula = %s
    """, (cedula,))

    medico = cursor.fetchone()
    conn.close()

    if not medico:
        raise HTTPException(status_code=404, detail="Médico no encontrado")

    return medico

@app.post("/medicos/{cedula}")
def crear_medico(cedula: str, especialidad: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    
    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    sql = "INSERT INTO medicos (id_usuario, especialidad) VALUES (%s, %s)"
    valores = (usuario[0], especialidad)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Médico creado con éxito"}

@app.put("/medicos/{cedula}")
def actualizar_medico(cedula: str, especialidad: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    
    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    sql = "UPDATE medicos SET especialidad=%s WHERE id_usuario=%s"
    valores = (especialidad, usuario[0])
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Médico actualizado con éxito"}

@app.delete("/medicos/{cedula}")
def eliminar_medico(cedula: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    
    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    cursor.execute("DELETE FROM medicos WHERE id_usuario = %s", (usuario[0],))
    conn.commit()
    conn.close()
    return {"mensaje": "Médico eliminado con éxito"}

#  CRUD  Pacientes 
@app.get("/pacientes/", response_model=List[dict])
def obtener_pacientes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.id_paciente, u.cedula, u.nombre, u.apellido, p.fecha_nacimiento, p.historial_medico
        FROM pacientes p
        JOIN usuarios u ON p.id_usuario = u.id_usuario
    """)

    pacientes = cursor.fetchall()
    conn.close()
    return pacientes

@app.get("/pacientes/{cedula}")
def obtener_paciente_por_cedula(cedula: str):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.id_paciente, u.cedula, u.nombre, u.apellido, p.fecha_nacimiento, p.historial_medico
        FROM pacientes p
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE u.cedula = %s
    """, (cedula,))

    paciente = cursor.fetchone()
    conn.close()

    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    return paciente

@app.post("/pacientes/{cedula}")
def crear_paciente(cedula: str, fecha_nacimiento: str, historial_medico: Optional[str]):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    
    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    sql = "INSERT INTO pacientes (id_usuario, fecha_nacimiento, historial_medico) VALUES (%s, %s, %s)"
    valores = (usuario[0], fecha_nacimiento, historial_medico)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Paciente creado con éxito"}

@app.put("/pacientes/{cedula}")
def actualizar_paciente(cedula: str, fecha_nacimiento: str, historial_medico: Optional[str]):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    
    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    sql = "UPDATE pacientes SET fecha_nacimiento=%s, historial_medico=%s WHERE id_usuario=%s"
    valores = (fecha_nacimiento, historial_medico, usuario[0])
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Paciente actualizado con éxito"}

@app.delete("/pacientes/{cedula}")
def eliminar_paciente(cedula: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT id_usuario FROM usuarios WHERE cedula = %s", (cedula,))
    usuario = cursor.fetchone()
    
    if not usuario:
        conn.close()
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    cursor.execute("DELETE FROM pacientes WHERE id_usuario = %s", (usuario[0],))
    conn.commit()
    conn.close()
    return {"mensaje": "Paciente eliminado con éxito"}

#CRUD CITAS

@app.get("/citas/", response_model=List[dict])
def obtener_citas():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT c.id_cita, u_p.cedula AS cedula_paciente, u_p.nombre AS nombre_paciente, 
                   u_m.cedula AS cedula_medico, u_m.nombre AS nombre_medico, 
                   c.fecha_hora, c.estado, c.notas 
            FROM citas c
            JOIN pacientes p ON c.id_paciente = p.id_paciente
            JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            JOIN medicos m ON c.id_medico = m.id_medico
            JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
        """)

        citas = cursor.fetchall()
        conn.close()

        return citas

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener citas: {e}")
    
@app.get("/citas/{id_cita}")
def obtener_cita_por_id(id_cita: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT c.id_cita, u_p.cedula AS cedula_paciente, u_p.nombre AS nombre_paciente, 
                   u_m.cedula AS cedula_medico, u_m.nombre AS nombre_medico, 
                   c.fecha_hora, c.estado, c.notas 
            FROM citas c
            JOIN pacientes p ON c.id_paciente = p.id_paciente
            JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            JOIN medicos m ON c.id_medico = m.id_medico
            JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
            WHERE c.id_cita = %s
        """, (id_cita,))

        cita = cursor.fetchone()
        conn.close()

        if not cita:
            raise HTTPException(status_code=404, detail="Cita no encontrada")

        return cita

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener la cita: {e}")
    
# Crear una nueva cita usando las cédulas del paciente y del médico
@app.post("/citas/{cedula_paciente}/{cedula_medico}")
def crear_cita(cedula_paciente: str, cedula_medico: str, cita: Cita):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("""
            SELECT p.id_paciente FROM pacientes p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            WHERE u.cedula = %s
        """, (cedula_paciente,))
        paciente = cursor.fetchone()

        if not paciente:
            conn.close()
            raise HTTPException(status_code=404, detail="Paciente no encontrado")

        cursor.execute("""
            SELECT m.id_medico FROM medicos m
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            WHERE u.cedula = %s
        """, (cedula_medico,))
        medico = cursor.fetchone()

        if not medico:
            conn.close()
            raise HTTPException(status_code=404, detail="Médico no encontrado")

        sql = """
            INSERT INTO citas (id_paciente, id_medico, fecha_hora, estado, notas)
            VALUES (%s, %s, %s, %s, %s)
        """
        valores = (paciente[0], medico[0], cita.fecha_hora, cita.estado, cita.notas)

        cursor.execute(sql, valores)
        conn.commit()
        conn.close()

        return {"mensaje": "Cita creada con éxito"}

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la cita: {e}")

@app.put("/citas/{id_cita}")
def actualizar_cita(id_cita: int, cita: Cita):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        sql = """
            UPDATE citas SET fecha_hora=%s, estado=%s, notas=%s
            WHERE id_cita=%s
        """
        valores = (cita.fecha_hora, cita.estado, cita.notas, id_cita)

        cursor.execute(sql, valores)
        conn.commit()
        conn.close()

        return {"mensaje": "Cita actualizada con éxito"}

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la cita: {e}")

@app.delete("/citas/{id_cita}")
def eliminar_cita(id_cita: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM citas WHERE id_cita = %s", (id_cita,))
        conn.commit()
        conn.close()

        return {"mensaje": "Cita eliminada con éxito"}

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar la cita: {e}")
    
