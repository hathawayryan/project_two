import psycopg2
import sys
from  flask import Flask,render_template
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/housing_income")
def housing_income():
    return render_template("housing_income.html")



@app.route('/data')
def send_data():
    con = psycopg2.connect("host='localhost' dbname='Non_profit' user='postgres' password='Deercreek7'")  
    cur = con.cursor()
    cur.execute("""select * from  house_median_prices""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)