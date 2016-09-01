# encoding: utf-8

from flask import Flask
from flask import request, jsonify
import json
#from bs4 import BeautifulSoup
from lxml import html
import requests
app = Flask(__name__)

listProduct = [
  {
    "id": 1,
    "quantity": 5,
    "name": 'Pão',
    "purchaseDate": "24/08/2016",
    "expectedDuration": 7,
    "img": 'pao.jpg'
  },
  {
    "id": 2,
    "quantity": 5,
    "name": 'Cebola',
    "purchaseDate": "24-08-2016",
    "expectedDuration": 7,
    "img": 'cebola.jpg'
  },
  {
    "id": 3,
    "quantity": 5,
    "name": 'Pimentão',
    "purchaseDate": "24-08-2016",
    "expectedDuration": 7,
    "img": 'pimentao.jpg'
  },
  {
    "id": 4,
    "quantity": 5,
    "name": 'Laranja',
    "purchaseDate": "24-08-2016",
    "expectedDuration": 7,
    "img": 'laranja.jpg'
  },
  {
    "id": 5,
    "quantity": 5,
    "name": 'Frango',
    "purchaseDate": "24-08-2016",
    "expectedDuration": 7,
    "img": 'frango.jpg'
  },
  {
    "id": 6,
    "quantity": 8,
    "name": 'Banana',
    "purchaseDate": "24-08-2016",
    "expectedDuration": 14,
    "img": 'banana.jpg'
  },
  {
    "id": 7,
    "quantity": 6,
    "name": 'Salame',
    "purchaseDate": "31/08/2016",
    "expectedDuration": 4,
    "img": 'salame.jpg'
  },
  {
    "id": 8,
    "quantity": 10,
    "name": 'Queijo',
    "purchaseDate": "31-08-2016",
    "expectedDuration": 5,
    "img": 'queijo.jpg'
  },
  {
    "id": 9,
    "quantity": 10,
    "name": 'Maçã',
    "purchaseDate": "31-08-2016",
    "expectedDuration": 20,
    "img": 'maca.jpg'
  },
  {
    "id": 10,
    "quantity": 10,
    "name": 'Azeitona',
    "purchaseDate": "31-08-2016",
    "expectedDuration": 20,
    "img": 'azeiton.jpg'
  }
]



@app.route("/")
def hello():

    return "Hello World!"
@app.route("/product")
def all():
    return jsonify(listProduct)

@app.route("/remove/<product_id>")
def delete(product_id):

    for i in reversed(range(len(listProduct))):
        if listProduct[i].get('id') == int(product_id):
            listProduct.pop(i)
    return "Done"

@app.route('/nfe/<id_nfe>')
def parse_nfe(id_nfe):
    #json_file = json.dumps([{"quantity": 10, "name": "Quejo", "purchaseDate": "11-6-2016", "expectedDuration": 5}, {"quantity": 5, "name": u"Pão", "purchaseDate": "15-06-2016", "expectedDuration": 7}], sort_keys=True, indent=4, separators=(',', ': '))
    page = requests.get("https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-NFC_QRCODE_1.asp?chNFe="+str(id_nfe))

    tree = html.fromstring(page.content)
    itens = tree.xpath('//td[@class="NFCDetalhe_Item"]/text()')
    dicionario = []
    i=0

    for item in itens:
        if i==0:
            codigo = item
            i=1
        elif i==1:
            descricao = item
            i=2
        elif i==2:
            qtde = item
            i=3
        elif i==3:
            un = item
            i=4
        elif i==4:
            vlunit = item
            i=5
        elif i==5:
            vltotal = item
            json = {"codigo": codigo, "descricao": descricao, "qtde": qtde, "un": un, "vlunit": vlunit, "vltotal": vltotal}
            dicionario.append(json)
            i=0

    lista_compras = dicionario[0:-1]
    #import pdb; pdb.set_trace()
    return jsonify(lista_compras)


if __name__ == "__main__":
    app.run()
