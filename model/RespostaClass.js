// module.exports serve para exportar a classe para outros locais do código.
module.exports = class RespostaClass { // Classe de Resposta.
    constructor(){ // Define padrões das propriedades de tratamento.
        this.erro = false;
        this.msg = null;
        this.dados = null;
    }
}