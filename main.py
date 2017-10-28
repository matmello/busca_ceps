import io
import requests
import lxml.html
import json
import re
from lxml import etree

url = "http://www.brasilao.com/cep/df/"
hxs = lxml.html.document_fromstring(requests.get(url).content)
# pagina final 1000
# hxs = lxml.html.document_fromstring(requests.get("http://buscaceps.com.br/estado/goias/pagina/").content)
# pagina final 48087

root_container = '//span[@class="codigos-postais2-container"]'
cep_container = ".//span[@class='codigo-postais2-title']/b/text()"
nome_container = ".//a/text()"

with io.open('ceps_bsb.json', 'a', encoding='utf8') as file:
    try:
        for node in hxs.xpath(root_container):
            bairro = {}
            cep = ''.join(re.findall('\d+', node.xpath(cep_container)[0]))
            nome = node.xpath(nome_container)[0]
            bairro['cep'] = cep
            bairro['nome'] = nome
            bairro['pagina'] = 0
            json.dump(bairro, file, ensure_ascii=False)
            file.write(",\n")

        for page in range(2, 1000):
            hxs = lxml.html.document_fromstring(requests.get(url + str(page) + ".html").content)
            try:
                for node in hxs.xpath(root_container):
                    bairro = {}
                    cep = ''.join(re.findall('\d+', node.xpath(cep_container)[0]))
                    nome = node.xpath(nome_container)[0]
                    bairro['cep'] = cep
                    bairro['nome'] = nome
                    bairro['pagina'] = page
                    print(bairro)
                    json.dump(bairro, file, ensure_ascii=False)
                    file.write(",\n")
            except IndexError:
                print("Erro")


    except IndexError:
        print("Erro")