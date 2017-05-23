var db = require('../../config/database');

var api = {}

var sugestions = [
    {id : 1, quant : 20, profissao : 'Mecanico' },
    {id : 2, quant : 34, profissao : 'Encanador'},
    {id : 3, quant : 30, profissao : 'Pedreiro' }]


var servicos = []

api.remove = function(req, res){
    
    var index = req.body;

    sugestions.splice(index, 1)
    
    res.json(sugestions);

}


api.listaServicos = function(req, res){
    res.json(servicos);
} 

api.adicionaServico = function(req, res){
   
    servicos.push(req.body)

    res.json(servicos)
}                

api.listaSugestions = function (req, res){
    res.json(sugestions);
}

api.adicionaSugestion = function(req, res){

    sugestions.push(req.body);

    res.json(sugestions);
}

module.exports = api;
