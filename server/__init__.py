from re import DEBUG
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from view import main

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
app.register_blueprint(main)

@socketio.on("connect")
def connect():
	print("connected")

@socketio.on("update-canvas")
def update_canvas(data):
	socketio.emit("update-canvas", data)

if __name__ == "__main__":
	socketio.run(app, debug=False)