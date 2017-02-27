var await = require('asyncawait/await');
var Promise = require('bluebird');

module.exports = function(db){

    var countryCreate = Promise.promisify(db.models.Country.create);
    var country = await (countryCreate({
        'description': 'Brasil'
    }));

    var stateCreate = Promise.promisify(db.models.State.create);
    var state = await (stateCreate({
        'description': 'Pernambuco',
        'shortCode': 'PE',
        'country_id': country.id
    }));

    var cityCreate = Promise.promisify(db.models.City.create);
    var city1 = await (cityCreate({
        'description': 'Recife',
        'state_id': state.id
    }));

    var city2 = await (cityCreate({
        'description': 'Olinda',
        'state_id': state.id
    }));

    var deviceTypeCreate = Promise.promisify(db.models.DeviceType.create);
    var deviceType = await (deviceTypeCreate({
        'description': 'Android'
    }));

    var professionCreate = Promise.promisify(db.models.Profession.create);
    var profession1 = await (professionCreate({
        'description': 'Eletricista',
        'active': true
    }));

    var profession2 = await (professionCreate({
        'description': 'Encanador',
        'active': true
    }));

    var serviceCreate = Promise.promisify(db.models.Service.create);
    var service1 = await (serviceCreate({
        'description': 'Aterramento',
        'active': true,
        'profession_id': profession1.id
    }));

    var service2 = await (serviceCreate({
        'description': 'Instalação de chuveiro elétrico',
        'active': true,
        'profession_id': profession1.id
    }));

    var service3 = await (serviceCreate({
        'description': 'Desentupimento',
        'active': true,
        'profession_id': profession2.id
    }));

    var userStatusCreate = Promise.promisify(db.models.UserStatus.create);
    var userStatus1 = await (userStatusCreate({
        'description': 'New'
    }));

    var userStatus2 = await (userStatusCreate({
        'description': 'Active'
    }));

    var userStatus3 = await (userStatusCreate({
        'description': 'Blocked'
    }));

    var requestStatusCreate = Promise.promisify(db.models.RequestStatus.create);
    var requestStatus1 = await (requestStatusCreate({
        'description': 'New'
    }));

    var requestStatus2 = await (requestStatusCreate({
        'description': 'Waiting'
    }));

    var requestStatus3 = await (requestStatusCreate({
        'description': 'Active'
    }));

    var requestStatus4 = await (requestStatusCreate({
        'description': 'Finished'
    }));

    var requestStatus5 = await (requestStatusCreate({
        'description': 'Closed'
    }));
};