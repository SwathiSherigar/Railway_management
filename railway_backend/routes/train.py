from fastapi import APIRouter,Query,HTTPException, Request
from utils.db import db
import MySQLdb


router=APIRouter()


@router.get('/trains')
async def get_trains(
    search_option: str = Query(None, alias='searchOption'),
    origin: str = Query(None),
    destination: str = Query(None),
    name: str = Query(None),
    number: int = Query(None)
):
    
    print("Inside get_trains route")
    cursor = db.cursor()
    params=None
    try:
        if search_option == "SEARCH by station":
            query = """
            SELECT DISTINCT
                t.train_name,
    t.train_num,
    t.origin AS origin,
    r.cost_1A AS class1A,
    r.cost_2A AS class2A,
    r.cost_3A AS class3A,
    r.cost_sleeper AS sleeper,
    r.cost_general AS general,
    t.arrival,
    r.time AS departure,
    r.city AS destination,
    t.mon,
    t.tue,
    t.wed,
    t.thu,
    t.fri,
    t.sat,
    t.sun,
    t.vacancy_1A,
    t.vacancy_2A,
    t.vacancy_3A,
    t.vacancy_sl AS vacancy_sl,
    t.vacancy_gl AS vacancy_gl

                
            FROM trains t
            JOIN search_trains_view stv ON t.train_num = stv.train_num
            JOIN route r ON t.train_num = r.train_num
            WHERE LOWER(stv.origin) LIKE %s
              AND LOWER(r.city) LIKE %s;
            """
            
            if origin is not None and destination is not None:
                origin = '%' + origin.lower() + '%'
                destination = '%' + destination.lower() + '%'
                params = (origin, destination)


        elif search_option == "SEARCH by name":
            query = "SELECT * FROM trains WHERE train_name = %s"
            params = (name,)
        elif search_option == "SEARCH by number":
            query = "SELECT * FROM trains WHERE train_num = %s"
            params = (number,)
        else:
            raise HTTPException(status_code=400, detail="Invalid search option")

        print("Executing query:", query)
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
    except MySQLdb.Error as err:
        print("Database error:", err)
        raise HTTPException(status_code=500, detail=f"Database error: {err}")
    finally:
        cursor.close()



        
@router.post('/add_train')
async def add_train(request: Request):
    print("hi")
    try:
        data = await request.json()
        print(data)
        train_num = data.get('train_num')
        train_name = data.get('train_name')
        origin = data.get('origin')
        destination = data.get('destination')
        arrival = data.get('arrival')
        departure = data.get('departure')
        mon = 0 if data.get('mon') == False else 1
        tue = 0 if data.get('tue') == False else 1
        wed = 0 if data.get('wed') == False else 1
        thu = 0 if data.get('thu') == False else 1
        fri = 0 if data.get('fri') == False else 1
        sat = 0 if data.get('sat') == False else 1
        sun = 0 if data.get('sun') == False else 1
        class1A = data.get('1A')
        class2A = data.get('2A',3000)
        class3A = data.get('3A',1500)
        sleeper = data.get('SL',1200)
        general = data.get('General',4000)
        vacancy_1A = data.get('vacancy_1A')
        vacancy_2A = data.get('vacancy_2A')
        vacancy_3A = data.get('vacancy_3A')
        vacancy_sl = data.get('vacancy_sl')
        vacancy_gl = data.get('vacancy_gl')
        query = "INSERT INTO trains (train_num, train_name, origin, destination, arrival, departure, mon, tue, wed, thu, fri, sat, sun, class1A, class2A, class3A, sleeper, general, vacancy_1A, vacancy_2A, vacancy_3A, vacancy_sl, vacancy_gl) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        
        values = (train_num, train_name, origin, destination, arrival, departure, mon, tue, wed, thu, fri, sat, sun, class1A, class2A, class3A, sleeper, general, vacancy_1A, vacancy_2A, vacancy_3A, vacancy_sl, vacancy_gl)
        print("Connecting to the database...")
        cursor = db.cursor()
        print("Executing SQL query...")
        cursor.execute(query, values)
        print("Committing changes to the database...")
        db.commit()
        return {'message': 'Train added successfully'}
    except Exception as e:
        print(f"SQL Error: {str(e)}")
        return {'error': 'Error in SQL execution'}
        
    finally:
        print("Closing the database connection...")
        db.close()




@router.get('/showtrain')
async def get_trains():
    cursor = None  # Initialize the cursor variable outside the try block
    try:
        query = "SELECT * FROM trains"
        print("Connecting to the database...")
        cursor = db.cursor()
        print("Executing SQL query...")
        cursor.execute(query)
        column_names = [desc[0] for desc in cursor.description]
        trains = cursor.fetchall()
        if not trains:
            raise HTTPException(status_code=404, detail="No trains found.")
        print(trains)
        trains_data = [dict(zip(column_names, train)) for train in trains]
        print(trains_data)
        return {"trains": trains_data}
    except Exception as e:
        print(f"SQL Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error in retrieving trains")
    finally:
        if cursor:
            print("Closing the database connection...")
            cursor.close()




# Route to delete a train
@router.delete('/delete_train/{train_num}')
async def delete_train(train_num: int):
    try:
        query = "DELETE FROM trains WHERE train_num = %s"
        values = (train_num,)
        print("Connecting to the database...")
        cursor = db.cursor()
        print("Executing SQL query...")
        cursor.execute(query, values)
        print("Committing changes to the database...")
        db.commit()
        return {'message': 'Train deleted successfully'}
    except Exception as e:
        print(f"SQL Error: {str(e)}")
        return {'error': 'Error in deleting train'}
    finally:
        print("Closing the database connection...")
        cursor.close()

# Route to update a train
@router.put('/update_train/{train_num}')
async def update_train(train_num: int, request: Request):
    cursor = None  # Initialize the cursor variable outside the try block
    try:
        data = await request.json()
        # Extract and update the necessary fields based on your requirements
        # ...

        query = "UPDATE trains SET train_name = %s, origin = %s, destination = %s, arrival = %s, departure = %s, " \
                "mon = %s, tue = %s, wed = %s, thu = %s, fri = %s, sat = %s, sun = %s, " \
                "class1A = %s, class2A = %s, class3A = %s, sleeper = %s, general = %s, " \
                "vacancy_1A = %s, vacancy_2A = %s, vacancy_3A = %s, vacancy_sl = %s, vacancy_gl = %s " \
                "WHERE train_num = %s"
        values = (
            data.get('train_name'),
            data.get('origin'),
            data.get('destination'),
            data.get('arrival'),
            data.get('departure'),
            int(data.get('mon', 0)),
            int(data.get('tue', 0)),
            int(data.get('wed', 0)),
            int(data.get('thu', 0)),
            int(data.get('fri', 0)),
            int(data.get('sat', 0)),
            int(data.get('sun', 0)),
            float(data.get('class1A', 0)),
            float(data.get('class2A', 0)),
            float(data.get('class3A', 0)),
            float(data.get('sleeper', 0)),
            float(data.get('general', 0)),
            data.get('vacancy_1A'),
            data.get('vacancy_2A'),
            data.get('vacancy_3A'),
            data.get('vacancy_sl'),
            data.get('vacancy_gl'),
            train_num
        )

        print("Connecting to the database...")
        cursor = db.cursor()
        print("Executing SQL query...")
        cursor.execute(query, values)
        print("Committing changes to the database...")
        db.commit()
        return {'message': 'Train updated successfully'}
    except Exception as e:
        print(f"SQL Error: {str(e)}")
        return {'error': 'Error in updating train'}
    finally:
        if cursor:
            print("Closing the database connection...")
            cursor.close()
