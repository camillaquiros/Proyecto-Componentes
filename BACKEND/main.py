from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel
import logging

# Configurar logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar a dominios específicos en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión con MySQL
def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Pama2702",  # Cambiar por la contraseña de tu MySQL
            database="GestionCitasMedicas"
        )
        return conn
    except mysql.connector.Error as e:
        logger.error(f"Error al conectar con la base de datos: {e}")
        return None

# Modelo de datos para citas médicas
class Cita(BaseModel):
    nombre_paciente: str
    fecha: str  # Formato "YYYY-MM-DD"

# Página de bienvenida con formato mejorado
@app.get("/", response_class=JSONResponse)
def home():
    return JSONResponse(content={
        "mensaje": "Bienvenido a la API de gestión de citas médicas 🚀",
        "endpoints": {
            "Obtener citas": "/citas",
            "Agregar cita": "/citas (POST)",
            "Actualizar cita": "/citas/{id} (PUT)",
            "Eliminar cita": "/citas/{id} (DELETE)"
        }
    })

# Obtener todas las citas
@app.get("/citas", response_class=JSONResponse)
def obtener_citas():
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")
    
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM citas")
    citas = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return JSONResponse(content={"citas": citas})

# Obtener una cita específica por ID
@app.get("/citas/{cita_id}", response_class=JSONResponse)
def obtener_cita_por_id(cita_id: int):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM citas WHERE id = %s", (cita_id,))
    cita = cursor.fetchone()
    cursor.close()
    conn.close()

    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    
    return JSONResponse(content={"cita": cita})

# Agregar una nueva cita
@app.post("/citas", response_class=JSONResponse)
def agregar_cita(cita: Cita):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")
    
    cursor = conn.cursor()
    cursor.execute("INSERT INTO citas (nombre_paciente, fecha) VALUES (%s, %s)", 
                   (cita.nombre_paciente, cita.fecha))
    conn.commit()
    cita_id = cursor.lastrowid
    cursor.close()
    conn.close()
    
    return JSONResponse(content={"mensaje": "Cita agregada exitosamente", "id": cita_id}, status_code=201)

# Actualizar una cita existente
@app.put("/citas/{cita_id}", response_class=JSONResponse)
def actualizar_cita(cita_id: int, cita: Cita):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")
    
    cursor = conn.cursor()
    cursor.execute("UPDATE citas SET nombre_paciente=%s, fecha=%s WHERE id=%s", 
                   (cita.nombre_paciente, cita.fecha, cita_id))
    conn.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    cursor.close()
    conn.close()
    
    return JSONResponse(content={"mensaje": "Cita actualizada exitosamente"})

# Eliminar una cita
@app.delete("/citas/{cita_id}", response_class=JSONResponse)
def eliminar_cita(cita_id: int):
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos")
    
    cursor = conn.cursor()
    cursor.execute("DELETE FROM citas WHERE id=%s", (cita_id,))
    conn.commit()
    
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    cursor.close()
    conn.close()
    
    return JSONResponse(content={"mensaje": "Cita eliminada exitosamente"})

@app.get("/verificar-conexion")
def verificar_conexion():
    conn = get_db_connection()
    if conn is None:
        raise HTTPException(status_code=500, detail="❌ No se pudo conectar a MySQL")
    
    cursor = conn.cursor()
    cursor.execute("SELECT DATABASE();")
    db_name = cursor.fetchone()[0]
    
    cursor.close()
    conn.close()

    return {"mensaje": "✅ Conexión exitosa a MySQL", "base_de_datos": db_name}
