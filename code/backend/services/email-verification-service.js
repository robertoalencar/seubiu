const dotenv = require('dotenv').config();
const Promise = require('bluebird');
const _ = require('lodash');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const doReadWrite = require('../utils/orm-db-transaction').doReadWrite;
const jwt = require('jsonwebtoken');
const ServiceException = require('../utils/service-exception');
const ERROR = require('../utils/service-error-constants');

const INTERNAL_SECRET = 'nmzFk22Ga6hKX4Fb';

const updateUserEmailVerified = (userId) => {
    return doReadWrite((db) => {
        const userGet = Promise.promisify(db.models.User.get);
        let user = await (userGet(userId));

        user.emailVerified = true;

        const userSave = Promise.promisify(user.save);
        return userSave();

    });

};

const generateToken = (userId) => {
    return jwt.sign({id:userId}, process.env.SESSION_SECRET+INTERNAL_SECRET, {expiresIn: '1d'});
};

const verifyToken = async ((token) => {
    const verify = Promise.promisify(jwt.verify);
    var payLoad;

    try {
        payLoad = await(verify(token, process.env.SESSION_SECRET+INTERNAL_SECRET));
    } catch(err) {
        throw ServiceException([ERROR.Common.INVALID_TOKEN]);
    }

    updateUserEmailVerified(payLoad.id);

    return true;
});

const generateEmailVerification = (userId, locale = 'pt-br') => {
    let token = generateToken(userId);
    let serverAddress = process.env.SERVER_ADDRESS + ':' + process.env.SERVER_PORT;
    let linkToVerify = 'http://' + serverAddress + '/api/emailverification?token=' + token;

    const EMAIL_VERIFICATION_TEMPLATE = {
        'pt-br': `
                    <html>
                        <div><span><b>Verifique o seu endereço de e-email:</b></span></div>
                        <br/>
                        <div>
                            <span>Para finalizar o cadastro da sua conta no Seu Biu, nós precisamos ter certeza que esse e-mail é seu.</span>
                            <br/>
                            <span>Clique no link <a href='${linkToVerify}'>${linkToVerify}</a> ou acesse-o usando um navegador de internet.</span>
                        </div>
                        <br/>
                        <div><span>Se você não não solicitou esse cadastro apenas ignore esse email.</span></div>
                        <br/>
                        <div><span>Obrigado.</span></div>
                    </html>
                `
    };

    return EMAIL_VERIFICATION_TEMPLATE[locale];
};

const getEmailValidationSubject = (locale = 'pt-br') => {

    const EMAIL_VERIFICATION_SUBJECT = {
        'pt-br': 'Conta no Seu Biu'
    };

    return EMAIL_VERIFICATION_SUBJECT[locale];
};

module.exports = {
    verifyToken: verifyToken,
    generateEmailVerification: generateEmailVerification,
    getEmailValidationSubject: getEmailValidationSubject
};
