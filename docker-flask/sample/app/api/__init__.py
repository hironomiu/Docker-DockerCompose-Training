from flask import Blueprint
app = Blueprint('api',__name__,url_prefix='/api')

from . import users
app.register_blueprint(users.app)