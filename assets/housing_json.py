import psycopg2
import sys
from  flask import Flask,render_template
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/data')
def send_data():
    con = psycopg2.connect("host='localhost' dbname='Non_profit' user='postgres' password='{password_here}'")  
    cur = con.cursor()
    cur.execute("""select * from  house_median_prices""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)