const fs = require('fs')
let regioes = require('./EntregaCidadeRegiao - Goiania')

// var stream = fs.createWriteStream('TB_EntregaCidadeRegiao.txt', {flags: 'a'});

// regiao[0].regioes.forEach(reg => {
//     let script = `INSERT INTO [dbo].[TB_EntregaCidadeRegiao] ([ID_ENTREGA_CIDADE_REGIAO] ,[ID_ENTREGA_CIDADE] ,[BT_ATIVO] ,[DT_CADASTRO] ,[TX_NOME]) VALUES (NEWID(), '0aa91e1e-042a-e711-80bb-001ec9e44883', 1, GETDATE (), '${reg}')`
//     stream.write(script, function() {
//         // Now the data has been written.
//       });
// })

// stream.close();

// fs.writeFile('TB_EntregaCidadeRegiao.txt', JSON.stringify(scripts))

ID_ENTREGA_CIDADE_PLANO_TURNO = ["E015F67A-7771-E711-80BB-001EC9E44883","7E047B87-7771-E711-80BB-001EC9E44883"]
ID_ENTREGA_CIDADE_PLANO = "E1C36E5A-7771-E711-80BB-001EC9E44883"
ID_ENTREGA_CIDADE_REGIAO = []
