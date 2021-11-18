from flask import Flask
from  flask_cors import CORS
 
class App:
    app = Flask(__name__)
    def __init__(self,views):
        self.initialize_config()
        self.initialize_views(views)

    def initialize_config(self):
        CORS(self.app)
    
    def initialize_views(self,views):
        for view in views:
            self.app.register_blueprint(view.router)
        
    def run(self):
        self.app.run(host='0.0.0.0', port='5001', debug=True)

    





    