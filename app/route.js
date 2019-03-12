const gitService = require('./controller/gitController');
module.exports = function (app) {
    app.get('/:user/:repo', gitService.getRepoDetails);
};