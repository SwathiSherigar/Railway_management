from fastapi import APIRouter, Request, HTTPException
from utils.db import db
import MySQLdb
from fastapi.responses import JSONResponse

router = APIRouter()


@router.post('/add_route')
async def add_route(request: Request):
    try:
        data = await request.json()

        # Extract values from the received JSON data
        serial_no = data.get("serial_no")
        train_num = data.get("train_num")
        city = data.get("city")
        time = data.get("time")
        cost_1A = data.get("cost_1A")
        cost_2A = data.get("cost_2A")
        cost_3A = data.get("cost_3A")
        cost_sleeper = data.get("cost_sleeper")
        cost_general = data.get("cost_general")

        # Sample SQL query for inserting data into the 'routes' table
        query = "INSERT INTO route (serial_no, train_num, city, time, cost_1A, cost_2A, cost_3A, cost_sleeper, cost_general) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"

        values = (serial_no, train_num, city, time, cost_1A, cost_2A, cost_3A, cost_sleeper, cost_general)
        print(values)
        # Establish a database connection
       

        # Use a context manager to handle the database connection
        with db.cursor() as cursor:
            cursor.execute(query, values)
        print("committing")
        # Commit changes to the database
        db.commit()

        # Close the database connection
        db.close()

        return JSONResponse(content={"message": "Route added successfully"}, status_code=200)
    except Exception as e:
        print(f"Error adding route: {str(e)}")
        return JSONResponse(content={"error": "Error adding route"}, status_code=500)
   

@router.get('/get_users')
async def get_users():
    try:
        # Create a database connection
        print("hi")

        # Specify dictionary=True when creating the cursor
        cursor = db.cursor()
        cursor.execute("SELECT * FROM passenger")
        users_data = cursor.fetchall()

        print('hi')
        print(users_data)

        # No need to convert database rows to dictionary

        return {"users": users_data}

    except Exception as e:
        print(f"Error getting users: {str(e)}")
        raise HTTPException(status_code=500, detail="Error getting users")
    finally:
        # Close the database connection in the finally block
        try:
            cursor.close()
        except NameError:
            pass  # cursor might not be defined
        try:
            db.close()
        except NameError:
            pass  # db might not be defined
@router.delete('/delete_user/{pid}')
async def delete_user(pid: int):
    try:
        # Establish a database connection
       
        print(pid)
        
        with db.cursor() as cursor:
            print("in db")
            cursor.execute("DELETE FROM passenger WHERE pid = %s", (pid,))
        print("commited")
        # Commit changes to the database
        db.commit()

        # Close the database connection
        db.close()

        return JSONResponse(content={"message": "User deleted successfully"}, status_code=200)
    except Exception as e:
        print(f"Error deleting user: {str(e)}")