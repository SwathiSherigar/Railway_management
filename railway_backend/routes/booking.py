from fastapi import APIRouter, Query, Request, HTTPException
from utils.db import db
import MySQLdb
router = APIRouter()



def get_or_insert_passenger(cursor, user):
    cursor.execute("SELECT pid FROM passenger WHERE email = %s", (user.get('email'),))
    existing_passenger = cursor.fetchone()
    if not existing_passenger:
        gender = user.get('gender') if user.get('gender') else 'Male'  # If gender is not provided, default to 'Male'
        cursor.execute("INSERT INTO passenger (email, phone, pname, age, gender) VALUES (%s, %s, %s, %s, %s)", 
                       (user.get('email'), user.get('phone'), user.get('name'), user.get('age'), gender))
        return cursor.lastrowid
    else:
        return existing_passenger[0]


@router.post('/make_booking')
async def make_booking(request: Request):
    try:
        data = await request.json()
        print("Received data:", data)
        train_num = data.get('train_num')
        journey_date = data.get('journey_date')
        coach = data.get('coach')
        
        # Access 'passengers' directly instead of 'passenger'
        passengers = data.get('passengers', [])
        passenger_count = len(passengers)
        print("Passenger count:", passenger_count)

        cursor = db.cursor()
        try:
            cursor.execute(f"SELECT {coach} FROM trains WHERE train_num = %s", (train_num,))
            fare_per_seat = cursor.fetchone()[0]
            fare = fare_per_seat * passenger_count
            print("Fare:", fare)

            cursor.execute("INSERT INTO booking (train_num, coach, fare, seatsbooked, journey_date) VALUES (%s, %s, %s, %s, %s)",
                           (train_num, coach, fare, passenger_count, journey_date))
            db.commit()

            cursor.execute("SELECT LAST_INSERT_ID()")
            booking_id = cursor.fetchone()[0]

            for user in passengers:
                passenger_id = get_or_insert_passenger(cursor, user)
                cursor.execute("INSERT INTO booking_passenger (bid, pid) VALUES (%s, %s)", (booking_id, passenger_id))
                db.commit()

            cursor.execute("UPDATE booking SET seatsbooked = %s WHERE bid = %s", (len(passengers), booking_id))
            db.commit()

        finally:
            cursor.close()
            db.close()

        return {'message': 'Booking made successfully', 'fare': fare}

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))




    
@router.post('/reservation')
async def make_reservation(
    origin: str = Query(None),
    destination: str = Query(None),
):
    cursor = db.cursor()
    query = """
        SELECT DISTINCT
            t.train_name,
            t.train_num,
            t.arrival,
            t.departure,
            r.cost_1A AS cost1A,
            r.cost_2A AS cost2A,
            r.cost_3A AS cost3A,
            r.cost_sleeper AS costSleeper,
            r.cost_general AS costGeneral
        FROM trains t
        JOIN search_trains_view stv ON t.train_num = stv.train_num
        JOIN route r ON t.train_num = r.train_num
        WHERE LOWER(stv.origin) LIKE %s
          AND LOWER(r.city) LIKE %s;
    """
    
    # Initialize params
    params = None
    
    if origin is not None and destination is not None:
        origin = '%' + origin.lower() + '%'
        destination = '%' + destination.lower() + '%'
        params = (origin, destination)

    print("Executing query:", query)
    
    # Check if params is defined before executing the query
    if params is not None:
        cursor.execute(query, params)
        columns = [col[0] for col in cursor.description]
        train_data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        print("Fetched data:", train_data)
        
        if not train_data:
            print("No results found")
            return {'message': 'No results found'}
        
        for train in train_data:
            train['arrival'] = str(train['arrival'])
            train['departure'] = str(train['departure'])
        
        return train_data
    else:
        # Handle the case where params is not defined (origin or destination is None)
        return {'message': 'Invalid origin or destination provided'}
@router.post('/generate_bill')
async def generate_bill(request: Request):
    try:
        data = await request.json()
        train_num = data.get('train_num')
        coach = data.get('coach')
        passengers = data.get('passengers', [])

        cursor = db.cursor()
        try:
            # Retrieve fare and other details
            cursor.execute(f"SELECT {coach} FROM trains WHERE train_num = %s", (train_num,))
            fare_per_seat = cursor.fetchone()[0]
            passenger_count = len(passengers)
            fare = fare_per_seat * passenger_count

            # Prepare bill details
            bill_details = {
                'train_num': train_num,
                'coach': coach,
                'passenger_count': passenger_count,
                'fare_per_seat': fare_per_seat,
                'total_fare': fare,
                'passengers': passengers,
            }

            return {'message': 'Bill generated successfully', 'bill_details': bill_details}

        finally:
            cursor.close()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))