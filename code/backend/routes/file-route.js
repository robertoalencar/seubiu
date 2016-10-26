var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var fileService = require('../services/file-service');

module.exports = function(router, isAuthenticated, isAdmin) {

    router.route('/files')

        .post(isAuthenticated, upload.single('file'), function(req, res) {

            var newFile = {};

            newFile.name = req.file.originalname;
            newFile.size = req.file.size;
            newFile.type = req.file.mimetype;
            newFile.data = req.file.buffer;
            newFile.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            fileService.create(newFile).then(function(savedFile){
                res.json(savedFile.id);
            }, function(err) {
                res.status(400).send(err.message || err);
            });

        });

    router.route('/files/:idFile')

        .get(function(req, res) {

            var idFile = req.params.idFile;

            fileService.getById(idFile).then(function(file){
                res.type(file.type);
                res.end(file.data, 'binary');
            }, function(err) {
                res.status(404).send(err.message || err);
            });

        });

};