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
            password="Pama2702",  
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
    
    # Buscar el usuario por email
    cursor.execute("SELECT contrasena FROM usuarios WHERE email = %s", (login_data.email,))
    usuario = cursor.fetchone()
    
    conn.close()

    if usuario:
        # Comparar contraseñas
        if usuario["contrasena"] == login_data.contrasena:
            return {"mensaje": "Acceso aprobado"}
        else:
            raise HTTPException(status_code=401, detail="Credenciales inválidas")
    else:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

# CRUD  Usuarios 
@app.get("/usuarios/", response_model=List[Usuario])
def obtener_usuarios():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios")
    usuarios = cursor.fetchall()
    conn.close()
    return usuarios

@app.post("/usuarios/")
def crear_usuario(usuario: Usuario):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Verificar si el email o la cédula ya existen
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

@app.put("/usuarios/{id_usuario}")
def actualizar_usuario(id_usuario: int, usuario: Usuario):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "UPDATE usuarios SET nombre=%s, apellido=%s, email=%s, telefono=%s, contrasena=%s, rol=%s, cedula=%s WHERE id_usuario=%s"
    valores = (usuario.nombre, usuario.apellido, usuario.email, usuario.telefono, usuario.contrasena, usuario.rol, usuario.cedula, id_usuario)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Usuario actualizado con éxito"}

@app.delete("/usuarios/{id_usuario}")
def eliminar_usuario(id_usuario: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id_usuario = %s", (id_usuario,))
    conn.commit()
    conn.close()
    return {"mensaje": "Usuario eliminado con éxito"}

# CRUD  Médicos 
@app.get("/medicos/", response_model=List[Medico])
def obtener_medicos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM medicos")
    medicos = cursor.fetchall()
    conn.close()
    return medicos

@app.post("/medicos/")
def crear_medico(medico: Medico):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "INSERT INTO medicos (id_usuario, especialidad) VALUES (%s, %s)"
    valores = (medico.id_usuario, medico.especialidad)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Médico creado con éxito"}

@app.put("/medicos/{id_medico}")
def actualizar_medico(id_medico: int, medico: Medico):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "UPDATE medicos SET id_usuario=%s, especialidad=%s WHERE id_medico=%s"
    valores = (medico.id_usuario, medico.especialidad, id_medico)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Médico actualizado con éxito"}

@app.delete("/medicos/{id_medico}")
def eliminar_medico(id_medico: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM medicos WHERE id_medico = %s", (id_medico,))
    conn.commit()
    conn.close()
    return {"mensaje": "Médico eliminado con éxito"}

#  CRUD  Pacientes 
@app.get("/pacientes/", response_model=List[Paciente])
def obtener_pacientes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pacientes")
    pacientes = cursor.fetchall()
    conn.close()
    return pacientes

@app.post("/pacientes/")
def crear_paciente(paciente: Paciente):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "INSERT INTO pacientes (id_usuario, fecha_nacimiento, historial_medico) VALUES (%s, %s, %s)"
    valores = (paciente.id_usuario, paciente.fecha_nacimiento, paciente.historial_medico)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Paciente creado con éxito"}

@app.put("/pacientes/{id_paciente}")
def actualizar_paciente(id_paciente: int, paciente: Paciente):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = "UPDATE pacientes SET id_usuario=%s, fecha_nacimiento=%s, historial_medico=%s WHERE id_paciente=%s"
    valores = (paciente.id_usuario, paciente.fecha_nacimiento, paciente.historial_medico, id_paciente)
    
    cursor.execute(sql, valores)
    conn.commit()
    conn.close()

    return {"mensaje": "Paciente actualizado con éxito"}

@app.delete("/pacientes/{id_paciente}")
def eliminar_paciente(id_paciente: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM pacientes WHERE id_paciente = %s", (id_paciente,))
    conn.commit()
    conn.close()
    return {"mensaje": "Paciente eliminado con éxito"}
