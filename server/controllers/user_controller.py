from google.cloud import datastore

class UserController:
    def __init__(self):
        self._datastore_client = datastore.Client.from_service_account_json('./itutorin-76fdbe0c56af.json')

    def login(self, user):
        """ Logs the user in by ensuring the user is added to our datastore
        :type user: str
        :rtype user: str
        """
        # Gets the user filtering by the name
        users = self._datastore_client.query(kind='Users')
        user_query = users.add_filter('user', '=', user).fetch()
        user_value = list(user_query)

        if self._user_exist(user_value):
            return user_value

        return ""

    def create_user(self, user, session_id):
        """ Creates user with the given user and session id in parameters
        :type user: str
        """
        curr_user = self.get_user(user)

        if curr_user:
        	return ""
        else:
        	key = self._datastore_client.key('Users')
        	users = datastore.Entity(key=key)
        	users.update({ 'user': user , 'session_id': session_id})
        	self._datastore_client.put(users)

    def get_user(self,user):
        """ Gives back the user data 
        :type user: str
        :rtype user: list[str]
        """
        curr_user = self._datastore_client.query(kind='Users')
        found_user = curr_user.add_filter('user', '=', user).fetch()

        return list(found_user)
        
    def get_user_session(self,user):
        """ Gives back the user session from datastore
        :type user: str
        :rtype user_session: str
        """
        curr_user = self.get_user(user)
        return curr_user[0]['session_id']
        
    def set_user_session(self,user,session_id):
        """ Sets the user session for the user 
        :type user: str
        :type session_id: str
        """
        curr_user =self.get_user(user)
        if curr_user:
        	curr_user[0]['session_id']= session_id
        	self._datastore_client.put(curr_user[0])
        	
    def _user_exist(self,query):
        return len(query) > 0