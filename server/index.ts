import express from "express";
import * as http from "http";
import * as socketio from "socket.io";

// variable declarations
const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {cors: {origin: "http://localhost:3000"}});

// socket functions
io.on("connection", socket => {
	console.log("connected");

	socket.on("join-room", data => {
		socket.join(data.roomId);
		socket.to(data.roomId).emit("join-room", data);
	})

	socket.on("update-teacher-canvas", data => {
		io.to(data.roomId).emit("update-teacher-canvas", data)
	})

	socket.on("update-student-canvas", data => {
		io.to(data.roomId).emit("update-student-canvas", data)
	})
})

server.listen(3001, () => console.log("> Ready on http://localhost:3001"))