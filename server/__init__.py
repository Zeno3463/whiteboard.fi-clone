from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from view import main

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origin="*")
app.register_blueprint(main)

@socketio.on("connect")
def connect():
	print("connected")

if __name__ == "__main__":
	socketio.run(app)