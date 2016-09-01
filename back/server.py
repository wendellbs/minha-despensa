# encoding: utf-8

from flask import Flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import json
from lxml import html
import requests
app = Flask(__name__)
CORS(app)

listProduct = [
  {
    "id": 1,
    "quantity": 5,
    "name": 'Pão',
    "purchaseDate": "20160824",
    "expectedDuration": 7,
    "img": 'pao.jpg'
  },
  {
    "id": 2,
    "quantity": 5,
    "name": 'Cebola',
    "purchaseDate": "20160824",
    "expectedDuration": 7,
    "img": 'cebola.jpg'
  },
  {
    "id": 3,
    "quantity": 5,
    "name": 'Pimentão',
    "purchaseDate": "20160824",
    "expectedDuration": 7,
    "img": 'pimentao.jpg'
  },
  {
    "id": 4,
    "quantity": 5,
    "name": 'Laranja',
    "purchaseDate": "20160824",
    "expectedDuration": 7,
    "img": 'laranja.jpg'
  },
  {
    "id": 5,
    "quantity": 5,
    "name": 'Frango',
    "purchaseDate": "20160824",
    "expectedDuration": 7,
    "img": 'frango.jpg'
  },
  {
    "id": 6,
    "quantity": 8,
    "name": 'Banana',
    "purchaseDate": "20160824",
    "expectedDuration": 14,
    "img": 'banana.jpg'
  },
  {
    "id": 7,
    "quantity": 6,
    "name": 'Salame',
    "purchaseDate": "20160831",
    "expectedDuration": 4,
    "img": 'salame.jpg'
  },
  {
    "id": 8,
    "quantity": 10,
    "name": 'Queijo',
    "purchaseDate": "20160831",
    "expectedDuration": 5,
    "img": 'queijo.jpg'
  },
  {
    "id": 9,
    "quantity": 10,
    "name": 'Maçã',
    "purchaseDate": "20160831",
    "expectedDuration": 20,
    "img": 'maca.jpg'
  },
  {
    "id": 10,
    "quantity": 10,
    "name": 'Azeitona',
    "purchaseDate": "20160831",
    "expectedDuration": 20,
    "img": 'azeitona.jpg'
  }
]

@app.route("/product")
def all():
    return jsonify(listProduct)

@app.route("/remove/<product_id>")
def delete(product_id):
    for i in reversed(range(len(listProduct))):
        if listProduct[i].get('id') == int(product_id):
            listProduct.pop(i)
    return "Done"

if __name__ == "__main__":
    app.run()
