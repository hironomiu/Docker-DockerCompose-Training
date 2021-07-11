from flask import Flask, request,render_template
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/',methods=['GET', 'POST'])
def form():
    count = redis.incr('hits')
    print(count)
    count = redis.decr('hits')
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
