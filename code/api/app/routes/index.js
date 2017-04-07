var api = require('../api'),
    path = require('path');

module.exports  = function(app) {
        
        app.route('/sugestions/')
 		.get(api.listaSugestions)
        .post(api.adicionaSugestion);

        app.route('/remove/sugestion/')
        .post(api.remove);

        app.route('/services/')
        .get(api.listaServicos)
        .post(api.adicionaServico);

};