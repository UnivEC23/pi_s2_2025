from flask import Flask, render_template, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from sqlalchemy import create_engine
import libsql

import os
import sys

load_dotenv()  # necessário para usar .env

TURSO_DATABASE_URL = os.environ.get("TURSO_DATABASE_URL")
TURSO_AUTH_TOKEN = os.environ.get("TURSO_AUTH_TOKEN")
# print(TURSO_DATABASE_URL)

# if __name__ == "__main__":
project_dir = os.path.dirname(os.path.abspath(__file__))
db_sql_lite = "sqlite:///{}".format(os.path.join(project_dir, "db_dev.db"))
db_mariadb = "mariadb+mariadbconnector://univesp:univesp@127.0.0.1:3306/pi2025_1"

# descomentar para alternar entre um e outro
# produção
# db_atual = db_mariadb

# desenvolvimento
db_atual = db_sql_lite

# app = Flask(__name__)
nomeApp = "Appy"
# global app
app = Flask(nomeApp)
app.config["DEBUG"] = True
app.config["SQLALCHEMY_DATABASE_URI"] = db_atual
# global db
db = SQLAlchemy(app)

engine = create_engine(
    "sqlite+libsql:///embedded.db",
    # f"sqlite+{TURSO_DATABASE_URL}?secure=true",
    connect_args={
        "auth_token": TURSO_AUTH_TOKEN,
        "sync_url": TURSO_DATABASE_URL,
        # "sync_interval": 60,
    },
)

# # Create a libSQL client for sync operations
# client = libsql.connect(
#     "embedded.db",
#     sync_url=TURSO_DATABASE_URL,
#     auth_token=TURSO_AUTH_TOKEN
# )

# # Force sync
# client.sync()
