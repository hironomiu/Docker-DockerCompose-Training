from flask import Blueprint,jsonify,current_app

app = Blueprint('users', __name__, url_prefix='/users')

@app.route('/',methods=['GET'])
def users():
    logger = current_app.logger
    logger.info("App /api/users")
    return jsonify([{"name":"Bob"},{"name":"花子"},{"name": "太郎"}])