const db = require('../../banco/dbConexao'); // Chamando conexão com o banco.

// module.exports serve para exportar a classe para outros locais do código.
module.exports = class GaleriaModel { // Classe de Galeria.
    static getTodos(callback){ // Método para recuperar todos os registros que existem no banco de dados.
        return db.query("SELECT * FROM galeria", callback); // query é o método que recebe o comando sql. Por padrão, ele recebe também uma função de callback no último parâmetro. Assim que retornado a informação, é executada a função de callback.
    }

    static getId(id, callback){ // Método para recuperar todos os registros que existem no banco de dados. Neste caso também será passado o id da galeria.
        return db.query("SELECT * FROM galeria WHERE id_galeria = ?", // query é o método que recebe o comando sql.
        [id], // O segundo parâmetro será um array com os elementos que vão substituir os caracteres coringa (?).
        callback); //  Por padrão, ele recebe também uma função de callback no último parâmetro. Assim que retornado a informação, é executada a função de callback. 
    }

    static adicionar(dados, callback){ // Método para inserir registros no banco de dados.
        return db.query("INSERT INTO galeria (titulo, caminho) VALUES (?, ?)", // query é o método que recebe o comando sql.
        [dados.titulo, dados.caminho], // O segundo parâmetro será um array com os elementos que vão substituir os caracteres coringa (?).
        callback); //  Por padrão, ele recebe também uma função de callback no último parâmetro. Assim que retornado a informação, é executada a função de callback. 
    }

    static editar(dados, callback){ // Método para editar um registro no banco de dados.
        if (dados.caminho != null) { // verificar existência da imagem.
            return db.query("UPDATE galeria SET titulo = ?, caminho = ? WHERE id_galeria = ?", // query é o método que recebe o comando sql.
            [dados.titulo, dados.caminho, dados.id_galeria], // O segundo parâmetro será um array com os elementos que vão substituir os caracteres coringa (?).
            callback); //  Por padrão, ele recebe também uma função de callback no último parâmetro. Assim que retornado a informação, é executada a função de callback. 
        }
        else {
            return db.query("UPDATE galeria SET titulo = ? WHERE id_galeria = ?", // query é o método que recebe o comando sql.
            [dados.titulo, dados.id_galeria], // O segundo parâmetro será um array com os elementos que vão substituir os caracteres coringa (?).
            callback); //  Por padrão, ele recebe também uma função de callback no último parâmetro. Assim que retornado a informação, é executada a função de callback. 
        }
    }

    static deletar(id, callback){ // Método para deletar um registro no banco de dados. Neste caso também será passado o id da galeria.
        return db.query("DELETE FROM galeria WHERE id_galeria = ?", // query é o método que recebe o comando sql.
        [id], // O segundo parâmetro será um array com os elementos que vão substituir os caracteres coringa (?).
        callback); //  Por padrão, ele recebe também uma função de callback no último parâmetro. Assim que retornado a informação, é executada a função de callback. 
    }
}