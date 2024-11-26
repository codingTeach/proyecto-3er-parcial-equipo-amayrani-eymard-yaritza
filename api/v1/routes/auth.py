from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.auth import Token
from core.config import get_db
from services.auth import create_access_token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(username: str, password: str, db: Session = Depends(get_db)):
    if username != "admin" or password != "admin":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": username})
    return {"access_token": access_token, "token_type": "bearer"}
