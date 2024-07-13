from fastapi import FastAPI
from routes import booking, login, contact, admin,train
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:5173", "http://127.0.0.1:5173"
]

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE","PATCH"],
    allow_headers=["Authorization", "Content-Type"],
)


app.include_router(booking.router)
app.include_router(login.router)
app.include_router(contact.router)
app.include_router(admin.router)
app.include_router(train.router)
