import psycopg2
import sys
from  flask import Flask,render_template
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def home_page():
    print("this worked")
    return render_template('index.html')

@app.route('/income')
def income_page():
    return render_template('income.html')


if __name__ == "__main__":
    app.run(debug=True)