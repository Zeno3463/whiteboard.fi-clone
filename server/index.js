"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
////// VARIABLE DECLARATION //////
const app = express_1.default();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: "http://localhost:3000" } });
////// SOCKET.IO FUNCTIONS //////
io.on("connection", socket => {
    console.log("connected");
    socket.on("join-room", data => {
        socket.join(data.roomId);
        socket.to(data.roomId).emit("join-room", data);
    });
    socket.on("update-teacher-canvas", data => {
        io.to(data.roomId).emit("update-teacher-canvas", data);
    });
    socket.on("update-student-canvas", data => {
        io.to(data.roomId).emit("update-student-canvas", data);
    });
});
server.listen(process.env.PORT || 3001, () => console.log("> Ready on http://localhost:3001"));
