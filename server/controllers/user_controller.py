from google.cloud import datastore

class UserController:
    def __init__(self):
        self._datastore_client = datastore.Client.from_service_account_json('./itutorin-76fdbe0c56af.json')

    def login(self, user):
        users = self._datastore_client.query(kind='Users')
        user_query = users.add_filter('name', '=', user).fetch()

        if self._user_exist(user_query):
            return user_query

    def create_user(self, user,session_id):
        # TODO
        #Need Unique usernames
        #MOST OF THE WORK HERE COMPLETE. Make sure user and user data in parameters get store
        users = self._datastore_client.query(kind='Users')
        user_query = users.add_filter('name', '=', user).fetch()
        indexU=self.get_user(user)
        if indexU:
        	print('user with that name already exists')
        	return ""
        else:
        
        
        	key = self._datastore_client.key('Users')
        	users = datastore.Entity(key=key)
        	#users.update({ 'user': user })
        	users.update({ 'user': user , 'session_id': session_id})

        	self._datastore_client.put(users)
        	

    def get_user(self,user):
        # TODO
        #WE WANT TO GET DATA FOR A SPECIFIC USER IN OUR DATASTORE
        return list(self._datastore_client.query(kind='Users').add_filter('user', '=', user).fetch())
        
        
        
        
        pass

    def get_user_session(self,user):
        # TODO
        #FOR A SPEFIC USER ON PARAMETER GET THE SESSION AND RETURN IT 
        indexU=self.get_user(user)
        if indexU:
        	return indexU[0]['session_id']
        
        pass

    def set_user_session(self,user,session_id):
        # TODO
        #UPDATE THE EXISTING USER DATA TO HAVE THE PARAMETER ASSIGNED SESSION_ID 
        indexU=self.get_user(user)
        if indexU:
        	indexU[0]['session_id']=session_id
        	self._datastore_client.put(indexU[0])
        	
        
        pass
        

    def _user_exist(self,query):
        return len(list(query)) > 0