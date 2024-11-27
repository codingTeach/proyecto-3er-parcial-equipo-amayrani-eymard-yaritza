from core.config import engine, SessionLocal
from models.student import Base
from services.student import load_students

# Crear las tablas
print("Creando tablas en la base de datos...")
Base.metadata.create_all(bind=engine)
print("Tablas creadas con éxito.")

# Cargar los datos iniciales
csv_file_path = "dataset/StudentGradesAndPrograms.csv"
print(f"Cargando datos desde {csv_file_path}...")
db = SessionLocal()
try:
    load_students(db, csv_file_path)
    print("Datos cargados con éxito.")
finally:
    db.close()
