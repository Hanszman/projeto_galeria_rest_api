const express = require('express'); // Chamando a biblioteca express (o express é um middleware).
const bodyparser = require('body-parser'); // Chamando a biblioteca body-parser.
const cors = require('cors'); // Chamando a biblioteca cors.
const api = express(); // Objeto que instancia/corresponde ao express.
const porta = 3000; // Porta padrão da aplicação.
const router = express.Router(); // Objeto que instancia/chama a biblioteca de rotas do express.
const galeriaRouter = require('./router/galeriaRouter'); // Chamando rota de galeria.

api.use(cors()); // Usa cors a partir do objeto (instancia) express.

api.use(bodyparser.urlencoded({extended: true})); // Usa, a partir do objeto express, o bodyparser que possui a função urlencoded para tratar objetos, campos de formulário, campos via json, etc. "Extended: true" serve para manipular os parâmetros da requisição como sendo objetos javascript.
api.use(bodyparser.json({limit: '20mb', extended: true})); // Usa, a partir do objeto express, o bodyparser que possui a função json, que serve para trabalhar com jsons. Está sendo definido um tamanho limite de 20mb.

// Diretório público.
api.use('/public', express.static(__dirname + '/public')); // Externaliza para a api o diretório público aonde serão salvas as imagens. Ou seja, vai tornar as imagens acessíveis externamente à api.

// Rotas
router.get("/", (req, resp)=> resp.json({ // Objeto router chamando o método get para escutar as requisições. O primeiro parâmetro é o nome da rota e o segundo parâmetro é a função callback em formato de arrow function. Os parâmetros dessa função de callback são a requisição e a resposta, respectivamente. O resp.json serve para definir a resposta em formato json.
    mensagem: 'API Online...'
})); // Retorna um json na resposta.
api.use("/", router); // Objeto da aplicação utiliza a rota principal.
api.use("/galeria", galeriaRouter); // Objeto da aplicação utiliza a rota galeria.

api.listen(porta); // Porta aonde o servidor escuta.
// Para inicializar a aplicação, executar no terminal (na pasta rest-api) o seguinte comando: node api
// Em seguida, abrir no navegador a url: localhost:3000
// É possível também inicializar com o comando: nodemon api (Desta forma, não é necessário executar novamente o comando toda vez que for alterado algo no código).

console.log("Run API Express on Port 3000");