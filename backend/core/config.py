from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://students_9b1z_user:iWiGgKHbvcNTKmLDsKpTLZ0G8rlzx85w@dpg-ct3ti31u0jms73a40oj0-a/students_9b1z" 
    JWT_SECRET_KEY: str = "supersecretkey"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()