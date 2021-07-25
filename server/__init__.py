from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, join_room
from view import main

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
app.register_blueprint(main)

@socketio.on("connect")
def connect():
	print("connected")

@socketio.on("update-teacher-canvas")
def update_teacher_canvas(data):
	socketio.emit("update-teacher-canvas", data, to=data["roomId"])

@socketio.on("update-student-canvas")
def update_student_canvas(data):
	socketio.emit("update-student-canvas", data, to=data["roomId"])

@socketio.on("join-room")
def join_room(data):
	print("hey")
	room_id = data["channel"]
	join_room(room_id)
	socketio.emit("join-room", data, to=room_id)
	print("yes")

if __name__ == "__main__":
	socketio.run(app, debug=False)