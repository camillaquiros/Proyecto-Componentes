from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from typing import List, Optional
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

# Configurar CORS para permitir solicitudes desde cualquier origen (útil para frontend)
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
            password="Pama2702",  # Cambia esto por tu contraseña de MySQL
            database="gestioncitasmedicas"  # Asegúrate de que coincide con el nombre correcto
        )
        return conn
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al conectar a MySQL: {e}")

# Modelos Pydantic para la validación de datos
class Usuario(BaseModel):
    nombre: str
    apellido: str
    email: str
    telefono: Optional[str]
    contrasena: str
    rol: str

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

class HistorialConsulta(BaseModel):
    id_paciente: int
    id_cita: int
    diagnostico: str
    tratamiento: str

class DisponibilidadMedico(BaseModel):
    id_medico: int
    dia_semana: str
    hora_inicio: str
    hora_fin: str

# Verificar conexión a la base de datos
@app.get("/verificar-conexion")
def verificar_conexion():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE()")
        db_name = cursor.fetchone()

        # Imprimir en la consola para depuración
        print("Nombre de la base de datos:", db_name)

        conn.close()
        
        if db_name and db_name[0]:
            return {"mensaje": "Conexión a la base de datos exitosa", "base_de_datos": db_name[0]}
        else:
            return {"mensaje": "Conexión a la base de datos exitosa, pero el nombre no se pudo obtener"}
    
    except Error as e:
        return {"error": str(e)}

# CRUD para Usuarios
@app.get("/usuarios/", response_model=List[Usuario])
def obtener_usuarios():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios")
        usuarios = cursor.fetchall()
        conn.close()
        return usuarios
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener usuarios: {e}")

@app.get("/usuarios/{id_usuario}", response_model=Usuario)
def obtener_usuario(id_usuario: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,))
        usuario = cursor.fetchone()
        conn.close()
        if usuario:
            return usuario
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar usuario: {e}")

@app.post("/usuarios/")
def crear_usuario(usuario: Usuario):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Verificar si el email ya está registrado
        cursor.execute("SELECT id_usuario FROM usuarios WHERE email = %s", (usuario.email,))
        if cursor.fetchone():
            conn.close()
            raise HTTPException(status_code=400, detail="El email ya está registrado")

        sql = """
        INSERT INTO usuarios (nombre, apellido, email, telefono, contrasena, rol)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        valores = (usuario.nombre, usuario.apellido, usuario.email, usuario.telefono, usuario.contrasena, usuario.rol)
        
        cursor.execute(sql, valores)
        conn.commit()
        conn.close()

        return {"mensaje": "Usuario creado con éxito"}
    
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al insertar usuario: {e}")

@app.put("/usuarios/{id_usuario}")
def actualizar_usuario(id_usuario: int, usuario: Usuario):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = """
        UPDATE usuarios SET nombre=%s, apellido=%s, email=%s, telefono=%s, contrasena=%s, rol=%s 
        WHERE id_usuario=%s
        """
        valores = (usuario.nombre, usuario.apellido, usuario.email, usuario.telefono, usuario.contrasena, usuario.rol, id_usuario)
        
        cursor.execute(sql, valores)
        conn.commit()
        conn.close()

        return {"mensaje": "Usuario actualizado con éxito"}
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar usuario: {e}")

@app.delete("/usuarios/{id_usuario}")
def eliminar_usuario(id_usuario: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM usuarios WHERE id_usuario = %s", (id_usuario,))
        conn.commit()
        conn.close()
        return {"mensaje": "Usuario eliminado con éxito"}
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar usuario: {e}")

# Puedes seguir la misma estructura para agregar endpoints de Médicos, Pacientes, Citas, HistorialConsultas, DisponibilidadMedicos

