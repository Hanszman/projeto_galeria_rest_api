var express = require('express'); // Chamando a biblioteca express (o express é um middleware).
var router = express.Router(); // Objeto que instancia/chama a biblioteca de rotas do express. Objeto para manipular as rotas.
var GaleriaModel = require('../model/galeria/GaleriaModel'); // Chamando a model de galeira.
var RepostaClass = require('../model/RespostaClass'); // Chamando a classe de resposta.
var fs = require('fs'); // Chamando biblioteca do file system, para trabalhar com arquivos.
var pastaPublica = "./public/imagens/"; // Local aonde serão salvas as imagens.

// Rota de visualização da lista geral de itens
router.get("/", function(req, resp, next){ // Objeto router chamando o método get para escutar as requisições. O primeiro parâmetro é o nome da rota e o segundo parâmetro é a função. Os parâmetros dessa função são a requisição a resposta, e o next, respectivamente.
    GaleriaModel.getTodos(function(erro, retorno){ // Chama o método da model galeria que serve para pegar todos os registros da tabela galeria. O getTodos recebe como parâmetro uma função de callback. A função recebe como parâmetro erro e retorno.
        let resposta = new RepostaClass(); // variável que instacia a classe de tratamento.
        
        if (erro) { // condição de tratamento de erros e retorno da resposta.
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log('erro: ', erro);
        }
        else {
           resposta.dados = retorno;
        }
        
        resp.json(resposta); // retorno da resposta em formato json.
    }); 
});

// Rota de visualização de item específico
router.get("/:id?", function(req, resp, next){ // Objeto router chamando o método get para escutar as requisições. O primeiro parâmetro é o nome da rota e o segundo parâmetro é a função. Os parâmetros dessa função são a requisição a resposta, e o next, respectivamente.
    GaleriaModel.getId(req.params.id, function(erro, retorno){ // Chama o método da model galeria que serve para pegar o registro específico da tabela galeria. O getId recebe como parâmetro o id específico que vem da requisição e uma função de callback. A função recebe como parâmetro erro e retorno.
        let resposta = new RepostaClass(); // variável que instacia a classe de tratamento.
        
        if (erro) { // condição de tratamento de erros e retorno da resposta.
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log('erro: ', erro);
        }
        else {
           resposta.dados = retorno; 
        }

        resp.json(resposta); // retorno da resposta em formato json.
    }); 
});

// Rota para a inserção de um registro
router.post("/?", function(req, resp, next){ // Objeto router chamando o método post para escutar as requisições. O primeiro parâmetro é o nome da rota e o segundo parâmetro é a função. Os parâmetros dessa função são a requisição a resposta, e o next, respectivamente.
    let resposta = new RepostaClass(); // variável que instacia a classe de tratamento.

    if (req.body.dados_imagem != null) { // Verificando se recebeu uma imagem na requisição.
        // Salvar a imagem.
        let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64'); // Lê a imagem em base64 e cria um buffer.
        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, ''); // Pega a data atual. O comando toLocaleString vai converter a data para o formato usado no local, no caso o Brasil. Em seguida utiliza o replace com uma expressão regular para remover os caracteres especiais.
        let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo; // Concateção do diretório aonde será salva a imagem + a data atual + o nome do arquivo.
        fs.writeFileSync(nomeImagemCaminho, bitmap); // Esse comando já salva de forma síncrona o arquivo na pasta pública.
        req.body.caminho = nomeImagemCaminho;

        GaleriaModel.adicionar(req.body, function(erro, retorno){ // Chama o método da model galeria que serve para inserir um registro na tabela galeria. O adicionar recebe como parâmetro os dados do registro que vem da requisição e uma função de callback. A função recebe como parâmetro erro e retorno.    
            if (erro) { // condição de tratamento de erros e retorno da resposta.
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro.";
                console.log('erro: ', erro);
            }
            else {
                if(retorno.affectedRows > 0) { // Verifica se houve algum registro afetado no banco.
                    resposta.msg = "Cadastro realizado com sucesso.";
                }
                else {
                    resposta.erro = true;
                    resposta.msg = "Não foi possível realizar a operação.";
                }
                // resposta.dados = retorno; // Salva a resposta com todos os seus campos
            }
            console.log('resp: ', resposta);
            resp.json(resposta); // retorno da resposta em formato json.
        }); 
    }
    else {
        resposta.erro = true;
        resposta.msg = "Não foi enviado uma imagem.";
        console.log('erro: ', resposta.msg);
        resp.json(resposta); // retorno da resposta em formato json.
    }
});

// Rota para a edição de um registro
router.put("/", function(req, resp, next){ // Objeto router chamando o método put para escutar as requisições. O primeiro parâmetro é o nome da rota e o segundo parâmetro é a função. Os parâmetros dessa função são a requisição a resposta, e o next, respectivamente.
    let resposta = new RepostaClass(); // variável que instacia a classe de tratamento.
    console.log('dados img: ', req.body.dados_imagem);

    if (req.body.dados_imagem != null) { // Verificando se recebeu uma imagem na requisição.
        // Salvar a imagem.
        let bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64'); // Lê a imagem em base64 e cria um buffer.
        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, ''); // Pega a data atual. O comando toLocaleString vai converter a data para o formato usado no local, no caso o Brasil. Em seguida utiliza o replace com uma expressão regular para remover os caracteres especiais.
        let nomeImagemCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nome_arquivo; // Concateção do diretório aonde será salva a imagem + a data atual + o nome do arquivo.
        fs.writeFileSync(nomeImagemCaminho, bitmap); // Esse comando já salva de forma síncrona o arquivo na pasta pública.
        req.body.caminho = nomeImagemCaminho;
    }

    GaleriaModel.editar(req.body, function(erro, retorno){ // Chama o método da model galeria que serve para editar o registro específico da tabela galeria. O editar recebe como parâmetro os dados do registro que vem da requisição e uma função de callback. A função recebe como parâmetro erro e retorno.    
        if (erro) { // condição de tratamento de erros e retorno da resposta.
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log('erro: ', erro);
        }
        else {
            if(retorno.affectedRows > 0) { // Verifica se houve algum registro afetado no banco.
                resposta.msg = "Registro alterado com sucesso.";
            }
            else {
                resposta.erro = true;
                resposta.msg = "Não foi possível alterar o registro.";
            }
            // resposta.dados = retorno; // Salva a resposta com todos os seus campos
        }
        console.log('resp: ', resposta);
        resp.json(resposta); // retorno da resposta em formato json.
    }); 
});

// Rota para a remoção de um registro
router.delete("/:id?", function(req, resp, next){ // Objeto router chamando o método delete para escutar as requisições. O primeiro parâmetro é o nome da rota e o segundo parâmetro é a função. Os parâmetros dessa função são a requisição a resposta, e o next, respectivamente.
    GaleriaModel.deletar(req.params.id, function(erro, retorno){ // Chama o método da model galeria que serve para deletar o registro específico da tabela galeria. O deletar recebe como parâmetro o id específico que vem da requisição e uma função de callback. A função recebe como parâmetro erro e retorno.
        let resposta = new RepostaClass(); // variável que instacia a classe de tratamento.
        
        if (erro) { // condição de tratamento de erros e retorno da resposta.
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro.";
            console.log('erro: ', erro);
        }
        else {
            if(retorno.affectedRows > 0) { // Verifica se houve algum registro afetado no banco.
                resposta.msg = "Registro excluído com sucesso.";
            }
            else {
                resposta.erro = true;
                resposta.msg = "Não foi possível excluir o registro.";
            }

            resposta.dados = retorno; 
        }

        resp.json(resposta); // retorno da resposta em formato json.
    }); 
});

module.exports = router; // module.exports serve para exportar a rota para outros locais do código.