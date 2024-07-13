from pydantic import BaseModel



class User:
    def __init__(self, email, phone, pname, pid, age, gender):
        self.email = email
        self.phone = phone
        self.pname = pname
        self.pid = pid
        self.age = age
        self.gender = gender


class Contacts(BaseModel):
    firstName:str
    email:str
    subject:str
    message:str


