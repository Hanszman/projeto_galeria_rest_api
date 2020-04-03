const mysql = require('mysql'); // Chamando a biblioteca mysql para conexão com o banco.

// É necessário criar a base de dados db_galeria no phpmyadmin do xampp
const conexao = mysql.createPool({ // Conexão com o banco através do mysql passando os parâmetros de conexão.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_galeria'
});

module.exports = conexao; // module.exports serve para exportar a constante de conexão para outros locais do código.