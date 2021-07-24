from flask import Blueprint, request, Response, jsonify

main = Blueprint("main", __name__)

@main.route("/")
def index():
	return "welcome to the server of whiteboard.fi clone!"