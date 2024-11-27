from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.student import Student, StudentCreate
from core.config import get_db
from typing import List
from services.student import get_students

router = APIRouter()

@router.get("/students", 
            tags=["Students"],
            response_model= List[Student],
            description="Get a list of all students")
async def read_students(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return await get_students(db, skip, limit)


