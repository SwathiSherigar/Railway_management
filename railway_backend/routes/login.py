from fastapi import APIRouter, Request
from utils.db import db
import MySQLdb
router = APIRouter()


@router.post('/login')
async def handle_login(request: Request):
    data = await request.json()
    password=data.get('password')
    print(password)
   
 
    email=data.get('email')
    print(email)
    query='select password,username,email from admin where email=%s'
    cursor=db.cursor()
    cursor.execute(query,(email,))
    result = cursor.fetchone()
    print(result[0])
    if result is None:
        cursor.close()
        return {'error': 'User not found'}, 401
    if password == result[0]:
        return {'login':True,'username':result[2]}
    return {'login':False,'message':'invalid credentials'}



@router.post('/get_admin')
async def get_admin(request: Request):
    try:
        print("hi")
        data = await request.json()
        email = data.get('email')
        cursor = db.cursor()
        query = "SELECT * FROM admin WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()
        if result is None:
            return {'message': 'Admin not found'}
        columns = [col[0] for col in cursor.description]
        admin_data = {columns[i]: result[i] for i in range(len(columns)) if columns[i] != 'password'}
        return admin_data
    except Exception as e:
        return {'message': f'Error: {str(e)}'}
    finally:
        cursor.close()