"""
core/db_connect.py
------------------
Shared SQL Server connection factory.
Import get_engine() in any project script.
"""
import os
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine


def get_engine(server: str = None, db: str = None) -> Engine:
    server = server or os.getenv("DB_SERVER", "localhost")
    db     = db     or os.getenv("DB_NAME",   "master")
    user   = os.getenv("DB_USER", "")
    pwd    = os.getenv("DB_PASSWORD", "")

    if user:
        url = (f"mssql+pyodbc://{user}:{pwd}@{server}/{db}"
               "?driver=ODBC+Driver+17+for+SQL+Server")
    else:
        url = (f"mssql+pyodbc://{server}/{db}"
               "?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes")

    return create_engine(url, fast_executemany=True)


def test_connection(engine: Engine = None) -> bool:
    try:
        e = engine or get_engine()
        with e.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("Connection OK")
        return True
    except Exception as ex:
        print(f"Connection failed: {ex}")
        return False
