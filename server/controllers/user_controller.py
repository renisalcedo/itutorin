from google.cloud import datastore

class UserController:
    def __init__(self):
        self.datastore_client = datastore.Client.from_service_account_json('./itutorin-76fdbe0c56af.json')

    def create_user(self, email):
        key = self.datastore_client.key('Users')
        users = datastore.Entity(key=key)
        users.update({ 'user': email })
        self.datastore_client.put(users)
        query = self.datastore_client.query(kind='Users')
        print(list(query.fetch()))


    def get_user(self,email):
        print("GRABBING DATA")
        users_query = self.datastore_client.query(kind='Users')
        print(list(users_query.fetch()))
        print("DONE!")

        return users_query