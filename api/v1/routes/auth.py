from fastapi import APIRouter, HTTPException
from schemas.auth import Token, LoginRequest
from services.auth import create_access_token

router = APIRouter()

@router.post("/login", 
             tags=["Login"],
             response_model=Token,
             description="Get a list of all students")
async def login(request: LoginRequest):
    # Aquí puedes validar usuario y contraseña (mock por ahora)
    if request.username != "admin" or request.password != "admin":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token({"sub": request.username})
    return {"access_token": access_token, "token_type": "bearer"}