from controllers.user_controller import UserController
from flask_restful import Resource
import string
import random

""" HANDLES CHAT ROOMS """
class ChatController(Resource):
    def __init__(self):
        self._session_id = None

    def session(self,user):
        """ Main Session method. Aims at finding session or creating if doesnt exist for user 
        :type user: str
        :rtype session_id: str
        """
        user_session = UserController.get_user_session(user)
        if user_session:
            return user_session

        self.set_session_id(user)
        return self._session_id

    def set_session_id(self,user):
        """ Creates a Session for a new user to invite others 
        :type user: str
        """
        self._create_random_session()

        new_user = UserController.create_user(user)
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