# encoding: utf-8

from flask import Flask
import json
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/nfe/<id_nfe>')
def parse_nfe(id_nfe):
    json_file = json.dumps([{"quantity": 10, "name": "Quejo", "purchaseDate": "11-6-2016", "expectedDuration": 5}, {"quantity": 5, "name": u"Pão", "purchaseDate": "15-06-2016", "expectedDuration": 7}], sort_keys=True, indent=4, separators=(',', ': '))

    return json_file

if __name__ == "__main__":
    app.run()
