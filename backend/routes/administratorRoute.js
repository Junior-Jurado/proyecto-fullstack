const AdministratorController = require('../controllers/administratorsController');

module.exports = (app) => {
    app.post('/api/administrator/register', AdministratorController.register);
    app.post('/api/administrator/login', AdministratorController.login);
}