from flask import Flask ,jsonify,render_template
from . import api

def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    app.register_blueprint(api.app)

    app.logger.info("create_app")

    @app.route('/')
    def index():
        app.logger.info("App /")
        return render_template('base.html',title='title',message="hello")

    return app