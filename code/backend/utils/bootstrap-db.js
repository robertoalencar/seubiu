var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('./orm-db-transaction');

var bootstrap = async (function() {

    return transaction.doReadWrite(function(db) {

        var countryCreate = Promise.promisify(db.models.Country.create);
        var country = await (countryCreate({
            'description': 'Brasil'
        }));
        console.log('Country: %s', country.description);

        var stateCreate = Promise.promisify(db.models.State.create);
        var state = await (stateCreate({
            'description': 'Pernambuco',
            'shortCode': 'PE',
            'country_id': country.id
        }));
        console.log('State: %s', state.description);

        var cityCreate = Promise.promisify(db.models.City.create);
        var city1 = await (cityCreate({
            'description': 'Recife',
            'state_id': state.id
        }));
        console.log('City: %s', city1.description);

        var city2 = await (cityCreate({
            'description': 'Olinda',
            'state_id': state.id
        }));
        console.log('City: %s', city2.description);

        var deviceTypeCreate = Promise.promisify(db.models.DeviceType.create);
        var deviceType = await (deviceTypeCreate({
            'description': 'Android'
        }));
        console.log('Device type: %s', deviceType.description);

        var professionCreate = Promise.promisify(db.models.Profession.create);
        var profession1 = await (professionCreate({
            'description': 'Eletricista',
            'active': true
        }));
        console.log('Profession: %s', profession1.description);

        var profession2 = await (professionCreate({
            'description': 'Encanador',
            'active': true
        }));
        console.log('Profession: %s', profession2.description);

        var serviceCreate = Promise.promisify(db.models.Service.create);
        var service1 = await (serviceCreate({
            'description': 'Aterramento',
            'active': true,
            'profession_id': profession1.id
        }));
        console.log('Service: %s', service1.description);

        var service2 = await (serviceCreate({
            'description': 'Instalação de chuveiro elétrico',
            'active': true,
            'profession_id': profession1.id
        }));
        console.log('Service: %s', service2.description);

        var service3 = await (serviceCreate({
            'description': 'Desentupimento',
            'active': true,
            'profession_id': profession2.id
        }));
        console.log('Service: %s', service3.description);

        var userStatusCreate = Promise.promisify(db.models.UserStatus.create);
        var userStatus1 = await (userStatusCreate({
            'description': 'New'
        }));
        console.log('User status New: %s', userStatus1.id);

        var userStatus2 = await (userStatusCreate({
            'description': 'Active'
        }));
        console.log('User status Active: %s', userStatus2.id);

        var userStatus3 = await (userStatusCreate({
            'description': 'Blocked'
        }));
        console.log('User status Blocked: %s', userStatus3.id);

        var requestStatusCreate = Promise.promisify(db.models.RequestStatus.create);
        var requestStatus1 = await (requestStatusCreate({
            'description': 'New'
        }));
        console.log('Request status New: %s', requestStatus1.id);

        var requestStatus2 = await (requestStatusCreate({
            'description': 'Waiting'
        }));
        console.log('Request status Waiting: %s', requestStatus2.id);

        var requestStatus3 = await (requestStatusCreate({
            'description': 'Active'
        }));
        console.log('Request status Active: %s', requestStatus3.id);

        var requestStatus4 = await (requestStatusCreate({
            'description': 'Finished'
        }));
        console.log('Request status Finished: %s', requestStatus4.id);

        var requestStatus5 = await (requestStatusCreate({
            'description': 'Closed'
        }));
        console.log('Request status Closed: %s', requestStatus5.id);

    });

});

bootstrap().then(function(){
    console.log('Done.');
    process.exit();
},function(err){
    console.error(err);
    process.exit();
});

// cd /seubiu && NODE_ENV=development && node utils/bootstrap-db.js