# from bs4 import BeautifulSoup
# import json
#
# table_data = [[cell.text for cell in row("td")]
                        #  for row in BeautifulSoup(html_data)("tr")]
#
# print(json.dumps(dict(table_data)))


from lxml import html
import requests
import re as regular_expression
import json

# page = requests.get("http://www.disastercenter.com/crime/uscrime.htm")
tree = test.html  #html.fromstring(page.text)

tables = [tree.xpath('//table/tbody/tr[2]/td/center/center/font/table/tbody'),
          tree.xpath('//table/tbody/tr[5]/td/center/center/font/table/tbody')]

tabs = []

for table in tables:
    tab = []
    for row in table:
        for col in row:
            var = col.text_content()
            var = var.strip().replace(" ", "")
            var = var.split('\n')
            if regular_expression.match('^\d{4}$', var[0].strip()):
                tab_row = {}
                tab_row["Código"] = var[0].strip()
                tab_row["Descrição"] = var[1].strip()
                tab_row["Qtde"] = var[2].strip()
                tab_row["Un"] = var[3].strip()
                tab_row["Vl Unit"] = var[4].strip()
                tab_row["Vl Total"] = var[5].strip()
                tab.append(tab_row)
    tabs.append(tab)

json_data = json.dumps(tabs)

output = open("output.txt", "w")
output.write(json_data)
output.close()
