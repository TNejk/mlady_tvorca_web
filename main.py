from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/update', methods=['GET'])
def update():
    return None

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)