import io
import requests
import lxml.html
import json
import re
from lxml import etree

hxs = lxml.html.document_fromstring(requests.get("http://buscaceps.com.br/cidade/distrito-federal/brasilia/pagina/").content)
# pagina final 48087

with io.open('ceps_bsb.json', 'a', encoding='utf8') as file:
    try:
        for node in hxs.xpath('//div[@class="post_list"]/div[contains(@class, "item")]'):
            bairro = {}
            cep = ''.join(re.findall('\d+', node.xpath(".//a/text()")[0]))
            nome = node.xpath(".//h3/text()")[0]
            bairro['cep'] = cep
            bairro['nome'] = nome
            bairro['pagina'] = 0
            json.dump(bairro, file, ensure_ascii=False)
            file.write(",\n")

        for page in range(13, 34515, 13):
            hxs = lxml.html.document_fromstring(requests.get("http://buscaceps.com.br/cidade/distrito-federal/brasilia/pagina/" + str(page)).content)
            try:
                for node in hxs.xpath('//div[@class="post_list"]/div[contains(@class, "item")]'):
                    bairro = {}
                    cep = ''.join(re.findall('\d+', node.xpath(".//a/text()")[0]))
                    nome = node.xpath(".//h3/text()")[0]
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