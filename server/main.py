import grpc.experimental.gevent as grpc_gevent
from flask import Flask
from flask_restful import Resource,Api
from flask_socketio import SocketIO, emit, send, join_room, leave_room
import logging

# FIXES ISSUE FOR DATASTORE AND SOCKET TOGETHER
grpc_gevent.init_gevent()

# Imported Controllers
from controllers.chat_controller import ChatController
from controllers.user_controller import UserController

# Initial App Setup
app = Flask(__name__)
sockets = SocketIO(app, async_mode=None, cors_allowed_origins="*")
api = Api(app)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """ An internal error occurred: """.format(e), 500

""" ------------------------- """
""" ROUTE CONTROLLERS SECTION """
""" ------------------------- """
api.add_resource(ChatController, '/sessions')

""" -------------------- """
""" CHAT SOCKET SECTION  """
""" -------------------- """
user_controller = UserController()

@sockets.on('join')
def on_join(user):
    room  = user_controller.get_user_session(user)
    join_room(room)
    emit('join', user + ' has joined the session.', room=room)

@sockets.on('leave')
def on_leave(user):
    room  = user_controller.get_user_session(user)
    emit('leave', user + ' has leaved the session.', room=room)
    leave_room(room)

@sockets.on('message')
def on_message(data):
    user = data['user']
    room = data['room']
    msg = data['msg']
    emit('message', msg, room=room)

if __name__ == '__main__':
    sockets.run(app)