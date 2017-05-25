const _ = require('lodash');
const professionService = require('../services/profession-service');
const routeUtil = require('../utils/route-util');
const apicacheUtil = require('../utils/apicache-util');

module.exports = (router, isAuthenticated, isAdmin, userHasAccess) => {

    const useCache = apicacheUtil.cacheWithRedis('1 month');

    router.route('/professions')

        .get(useCache, (req, res) => {

            professionService.getAll().then((professions) => {
                res.json(professions);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professions/:id')

        .get(useCache, (req, res) => {

            const id = req.params.id;

            professionService.getById(id).then((profession) => {
                if (_.isEmpty(profession)) res.status(404);
                res.json(profession);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

    router.route('/professions/:id/services')

        .get(useCache, (req, res) => {

            const id = req.params.id;

            professionService.getServicesByProfession(id).then((services) => {
                if (_.isEmpty(services)) res.status(404);
                res.json(services);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        })
        .post(isAuthenticated, isAdmin, (req, res) => {

            const professionId = req.params.id;
            const description = req.body.description;

            professionService.addServiceToProfession(professionId, description).then((success) => {
                res.send(success);
            }, (err) => {
                routeUtil.handleException(res, err);
            });

        });

};
