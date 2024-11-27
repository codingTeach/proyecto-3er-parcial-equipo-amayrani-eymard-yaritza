from fastapi import FastAPI
from api.v1.routes import auth, students
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Students API",
    description="Rest API for manage students",
    version="0.0.1")

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://example.com",
    "http://example.com:8080",
]

methods = ["GET", "POST"]

headers = [
    "Content-Type",
    "Authorization",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=methods,
    allow_headers=headers,
    allow_credentials=True,
    expose_headers=["Content-Disposition"],
)

app.include_router(auth.router)
app.include_router(students.router)
