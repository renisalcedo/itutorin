import grpc.experimental.gevent as grpc_gevent
from flask import Flask
from flask_sockets import Sockets
import logging

# FIXES ISSUE FOR DATASTORE AND SOCKET TOGETHER
grpc_gevent.init_gevent()

# Imported Controllers
from controllers.chat_controller import ChatController
from controllers.user_controller import UserController

app = Flask(__name__)
sockets = Sockets(app)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

# Initializes the class routes
""" USER MANAGER SECTION """
user_controller = UserController()
user_controller.create_user('renisalcedo@sample.com')
user_controller.get_user('renisalcedo@sample.com')


""" CHAT MANAGER SECTION """
chat_controller = ChatController()
@sockets.route('/chat')
def chat_socket(ws):
    while not ws.closed:
        message = ws.receive()
        if message is None:  # message is "None" if the client has closed.
            continue
        # Send the message to all clients connected to this webserver
        # process. (To support multiple processes or instances, an
        clients = ws.handler.server.clients.values()
        for client in clients:
            client.ws.send(message)


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)