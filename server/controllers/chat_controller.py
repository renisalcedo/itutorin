from controllers.user_controller import UserController
from flask_restful import Resource
from flask import request
import string
import random

""" HANDLES CHAT ROOMS """
class ChatController(Resource):
    def __init__(self):
        self._session_id = None

    def post(self):
        """ Will get the user and return session or create one if not yet exist
        :type request.user_request: Dict{user}
        :rtype res: Dict{session_id}
        """
        user_request = request.get_json()
        user = user_request['user']
        session_id = self.session(user)

        return {"Status": "Success", 'session_id': session_id}, 200

    def session(self,user):
        """ Main Session method. Aims at finding session or creating if doesnt exist for user 
        :type user: str
        :rtype session_id: str
        """
        user_logged = UserController.login(user)
        user_controller = UserController()

        if user_logged:
            user_session = user_controller.get_user_session(user)
            if user_session:
                return user_session

            self.set_session_id(user)

            return self._session_id
        else:
            new_session = self._create_random_session(user)
            user_controller.create_user(user,new_session)

            return new_session


    def set_session_id(self,user):
        """ Creates a Session for a new user to invite others 
        :type user: str
        """
        self._create_random_session()
        UserController.set_user_session(user,self._session_id)

    def _create_random_session(self,user):
        """" Creates a random session id with username
        :type user: str
        """
        SESSION_CHARS = 16
        key_options = string.ascii_letters + '0123456789'
        session_id = user
        i = 0

        while i < SESSION_CHARS:
            session_id += random.choice(key_options)
            i += 1

        self._session_id = session_id