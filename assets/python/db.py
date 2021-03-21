import psycopg2
import sys
from  flask import Flask,render_template
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def home_page():
    example_embed='This string is from python'
    print("this worked")
    return render_template('index.html', embed=example_embed)

@app.route('/data')
def send_data():
    con = psycopg2.connect("host='localhost' dbname='Non_profit' user='postgres' password='Bobo90'")  
    cur = con.cursor()
    cur.execute("""select * from  income""")
    data = [col for col in cur]
    cur.close()
    print(data)
    return jsonify(data)

@app.route('/chart1')
def income_data():
    con = psycopg2.connect("host='localhost' dbname='Non_profit' user='postgres' password='Bobo90'")  
    cur = con.cursor()
    cur.execute("""select * from  income""")
    data = [col for col in cur]
    cur.close()
    return  render_template('index.html', embed=jsonify(data))

if __name__ == "__main__":
    app.run(debug=True)