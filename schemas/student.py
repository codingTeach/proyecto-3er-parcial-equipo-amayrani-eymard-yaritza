from pydantic import BaseModel

class StudentBase(BaseModel):
    schoolyear : str
    gradeLevel : str
    classPeriod : str
    classType : str
    schoolName : str
    gradePercentage : float
    avid : str
    sped : str
    migrant : str
    ell : str
    student_ID : str

class StudentCreate(StudentBase):
    pass

class Student(StudentBase):
    id: int

    class Config:
        orm_mode = True
