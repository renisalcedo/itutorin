import os
import grpc.experimental.gevent as grpc_gevent
from flask import Flask
from flask_restful import Resource,Api
from flask_socketio import SocketIO, emit, send, join_room, leave_room
import logging

# FIXES ISSUE FOR SERVER FREEZING OR HANGING
grpc_gevent.init_gevent()
os.environ['GOOGLE_CLOUD_DISABLE_GRPC']= 'True'

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
def on_join(session_id):
    join_room(session_id)
    emit('join', 200, room=session_id)

@sockets.on('create_session')
def on_join(user):
    room  = user_controller.get_user_session(user)
    join_room(room)
    emit('create_session', room, room=room)

@sockets.on('leave')
def on_leave(session_id):
    emit('leave', 200, room=session_id)
    leave_room(session_id)

@sockets.on('message')
def on_message(data):
    user = data['user']
    room = data['room']
    msg = data['msg']
    emit('message', msg, room=room)

if __name__ == '__main__':
    sockets.run(app)