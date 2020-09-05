import grpc.experimental.gevent as grpc_gevent
from flask import Flask
from flask_restful import Resource,Api
from flask_socketio import SocketIO, emit, send, join_room, leave_room
import logging

# FIXES ISSUE FOR DATASTORE AND SOCKET TOGETHER
grpc_gevent.init_gevent()

# Imported Controllers
from controllers.chat_controller import ChatController

app = Flask(__name__)
sockets = SocketIO(app, async_mode=None, cors_allowed_origins="*")
api = Api(app)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

""" ------------------------- """
""" ROUTE CONTROLLERS SECTION """
""" ------------------------- """
api.add_resource(ChatController, '/sessions')

""" -------------------- """
""" CHAT SOCKET SECTION  """
""" -------------------- """
@sockets.on('connect')
def greeting():
    print("WELCOME !!!!!!!!!!!")
    emit("HI, thanks for connecting!")

@sockets.on('message')
def chat_socket(text):
    print(text)
    send(text)

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    sockets.run(app)