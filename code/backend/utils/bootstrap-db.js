var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('./orm-db-transaction');

var bootstrap = async (function() {

    return transaction.doReadWrite(function(db) {

        var country = await (new Promise(function (resolve, reject) {
                db.models.Country.create({
                    'description': 'Brasil'
                }, function(err, newCountry) {
                    if (err) reject(err);
                    resolve(newCountry);
                });
        }));

        console.log('Country: %s', country.description);

        var state = await (new Promise(function (resolve, reject) {
                db.models.State.create({
                    'description': 'Pernambuco',
                    'shortCode': 'PE',
                    'country_id': country.id
                }, function(err, newState) {
                    if (err) reject(err);
                    resolve(newState);
                });
        }));

        console.log('State: %s', state.description);

        var city1 = await (new Promise(function (resolve, reject) {
                db.models.City.create({
                    'description': 'Recife',
                    'state_id': state.id
                }, function(err, newCity) {
                    if (err) reject(err);
                    resolve(newCity);
                });
        }));

        console.log('City: %s', city1.description);

        var city2 = await (new Promise(function (resolve, reject) {
                db.models.City.create({
                    'description': 'Olinda',
                    'state_id': state.id
                }, function(err, newCity) {
                    if (err) reject(err);
                    resolve(newCity);
                });
        }));

        console.log('City: %s', city2.description);

        var deviceType = await (new Promise(function (resolve, reject) {
                db.models.DeviceType.create({
                    'description': 'Android'
                }, function(err, newDeviceType) {
                    if (err) reject(err);
                    resolve(newDeviceType);
                });
        }));

        console.log('Device type: %s', deviceType.description);

        var profession1 = await (new Promise(function (resolve, reject) {
                db.models.Profession.create({
                    'description': 'Eletricista',
                    'active': true
                }, function(err, newProfession) {
                    if (err) reject(err);
                    resolve(newProfession);
                });
        }));

        console.log('Profession: %s', profession1.description);

        var service1 = await (new Promise(function (resolve, reject) {
                db.models.Service.create({
                    'description': 'Aterramento',
                    'active': true,
                    'profession_id': profession1.id
                }, function(err, newService) {
                    if (err) reject(err);
                    resolve(newService);
                });
        }));

        console.log('Service: %s', service1.description);

        var service2 = await (new Promise(function (resolve, reject) {
                db.models.Service.create({
                    'description': 'Instalação de chuveiro elétrico',
                    'active': true,
                    'profession_id': profession1.id
                }, function(err, newService) {
                    if (err) reject(err);
                    resolve(newService);
                });
        }));

        console.log('Service: %s', service2.description);

        var profession2 = await (new Promise(function (resolve, reject) {
                db.models.Profession.create({
                    'description': 'Encanador',
                    'active': true
                }, function(err, newProfession) {
                    if (err) reject(err);
                    resolve(newProfession);
                });
        }));

        console.log('Profession: %s', profession2.description);

        var service3 = await (new Promise(function (resolve, reject) {
                db.models.Service.create({
                    'description': 'Desentupimento',
                    'active': true,
                    'profession_id': profession2.id
                }, function(err, newService) {
                    if (err) reject(err);
                    resolve(newService);
                });
        }));

        console.log('Service: %s', service3.description);

        var userStatus1 = await (new Promise(function (resolve, reject) {
                db.models.UserStatus.create({
                    'description': 'New'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('User status New: %s', userStatus1.id);

        var userStatus2 = await (new Promise(function (resolve, reject) {
                db.models.UserStatus.create({
                    'description': 'Active'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('User status Active: %s', userStatus2.id);

        var userStatus3 = await (new Promise(function (resolve, reject) {
                db.models.UserStatus.create({
                    'description': 'Blocked'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('User status Blocked: %s', userStatus3.id);


        var requestStatus1 = await (new Promise(function (resolve, reject) {
                db.models.RequestStatus.create({
                    'description': 'New'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('Request status New: %s', requestStatus1.id);

        var requestStatus2 = await (new Promise(function (resolve, reject) {
                db.models.RequestStatus.create({
                    'description': 'Waiting'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('Request status Waiting: %s', requestStatus2.id);

        var requestStatus3 = await (new Promise(function (resolve, reject) {
                db.models.RequestStatus.create({
                    'description': 'Active'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('Request status Active: %s', requestStatus3.id);

        var requestStatus4 = await (new Promise(function (resolve, reject) {
                db.models.RequestStatus.create({
                    'description': 'Finished'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
        }));

        console.log('Request status Finished: %s', requestStatus4.id);

        var requestStatus5 = await (new Promise(function (resolve, reject) {
                db.models.RequestStatus.create({
                    'description': 'Closed'
                }, function(err, newStatus) {
                    if (err) reject(err);
                    resolve(newStatus);
                });
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