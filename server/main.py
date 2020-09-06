import grpc.experimental.gevent as grpc_gevent
from flask import Flask
from flask_restful import Resource,Api
from flask_sockets import Sockets
import logging


# FIXES ISSUE FOR DATASTORE AND SOCKET TOGETHER
grpc_gevent.init_gevent()

# Imported Controllers
from controllers.chat_controller import ChatController
from controllers.user_controller import UserController

app = Flask(__name__)
sockets = Sockets(app)
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
userC=UserController()
userC.create_user('James Mathew','3526268')

print('user login ')
print(userC.login('James Mathew'))
userC.get_user('James Mathew')

print('user session before ')
print(userC.get_user_session('James Mathew'))
userC.set_user_session('James Mathew','0009')

print('user session after set new usersession ')
print(userC.get_user_session('James Mathew'))

print()
userC=UserController()
print("trying to add user same name")
userC.create_user('James Mathew','3526268')
""" -------------------- """
""" CHAT SOCKET SECTION  """
""" -------------------- """
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