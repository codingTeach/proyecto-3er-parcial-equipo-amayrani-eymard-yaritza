from sqlalchemy import Column, Float, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    schoolyear = Column(String, nullable=False)
    gradeLevel = Column(String, nullable=False)
    classPeriod = Column(String, nullable=True)
    classType = Column(String, nullable=True)
    schoolName = Column(String, nullable=False)
    gradePercentage = Column(Float, nullable=True)
    avid = Column(String, nullable=True)
    sped = Column(String, nullable=True)
    migrant = Column(String, nullable=True)
    ell = Column(String, nullable=True)
    student_ID = Column(String, unique=False, nullable=False)