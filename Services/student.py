import csv
from models.student import Student

def load_students(db, csv_file_path):
    with open(csv_file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        
        for row in reader:
            student = Student(
                schoolyear=row["schoolyear"],
                gradeLevel=row["gradeLevel"],
                classPeriod=row.get("classPeriod"),
                classType=row.get("classType"),
                schoolName=row["schoolName"],
                gradePercentage=float(row["gradePercentage"]) if row["gradePercentage"] else None,
                avid=row.get("avid"),
                sped=row.get("sped"),
                migrant=row.get("migrant"),
                ell=row.get("ell"),
                student_ID=row["student_ID"],
            )
            db.add(student)
        db.commit()

async def get_students(db, skip, limit):
    return db.query(Student).offset(skip).limit(limit).all()
