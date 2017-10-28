const fs = require('fs')
let ceps = require('./ceps_gyn_bkp')
let regioes = require('./EntregaCidadeRegiao - Goiania')
let bairros = []
IDS_ENTREGA_CIDADE_PLANO_TURNO = ["E015F67A-7771-E711-80BB-001EC9E44883", "7E047B87-7771-E711-80BB-001EC9E44883"]
ID_ENTREGA_CIDADE_PLANO = "E1C36E5A-7771-E711-80BB-001EC9E44883"

ceps.forEach(cep => {
    let cidade = cep.nome.split(',')[1].trim()
    let regiao = cep.nome.split(',')[2].trim()
    cep.cidade = cidade
    cep.regiao = regiao
    bairros.push(cidade)
})

var stream = fs.createWriteStream('TB_EntregaCidadePlanoTurnoTaxa.txt', { flags: 'a' })
IDS_ENTREGA_CIDADE_PLANO_TURNO.forEach(ID_ENTREGA_CIDADE_PLANO_TURNO => {
    // let script = `INSERT INTO [dbo].[TB_EntregaCidadeRegiaoCep] ([ID_ENTREGA_CIDADE_REGIAO_CEP] ,[ID_ENTREGA_CIDADE_REGIAO] ,[TX_CEP]) VALUES (NEWID() , '${regioes.filter(regiao => regiao.TX_NOME == cep.regiao).map(regiao => regiao.ID_ENTREGA_CIDADE_REGIAO)[0]}', '${cep.cep}')`
    regioes.forEach(regiao => {
        let script = `INSERT INTO [dbo].[TB_EntregaCidadePlanoTurnoTaxa] ([ID_ENTREGA_CIDADE_PLANO_TURNO_TAXA] ,[ID_ENTREGA_CIDADE_PLANO_TURNO],[DT_CADASTRO],[VL_TAXA] ,[ID_ENTREGA_CIDADE_REGIAO]) VALUES (NEWID() , '${ID_ENTREGA_CIDADE_PLANO_TURNO}', GETDATE() , 0, '${regiao.ID_ENTREGA_CIDADE_REGIAO}')`
        console.log(script)
        stream.write(script, function () {
    
        })
    })
})



// bairros = bairros.filter((elem, pos, arr) => arr.indexOf(elem) == pos).filter(bairro => bairro == "Goiânia").map(bairro => (
//     {
//         nome: bairro,
//         ativo: true,
//         regioes: ceps.filter(cep => cep.cidade == bairro).map(cep => cep.regiao).filter((elem, pos, arr) => arr.indexOf(elem) == pos),
//         ceps: ceps.filter(cep => cep.cidade == bairro).map(cep => cep.cep).filter((elem, pos, arr) => arr.indexOf(elem) == pos)
//     }
// ))

// fs.writeFile('regioes.json', JSON.stringify(bairros))