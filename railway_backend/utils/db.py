
import MySQLdb


db_config = {
    "host": "localhost",
    "user": "root",
    "password": "Swathi@2003",
    "database": "railway",
    "charset":'utf8mb4'
}

db=MySQLdb.connect(**db_config)


import time

MAX_RETRIES = 3

def execute_query_with_retries(cursor, query):
    retries = 0
    while retries < MAX_RETRIES:
        try:
            cursor.execute(query)
            return cursor.fetchall()
        except MySQLdb.OperationalError as e:
            if e.args[0] == 2006:  # MySQL server has gone away
                # Attempt to reconnect
                cursor.close()
                cursor.connect()
                retries += 1
                time.sleep(1)
            else:
                raise
    # Handle the case when all retries fail
    raise Exception("Unable to execute query after multiple retries.")