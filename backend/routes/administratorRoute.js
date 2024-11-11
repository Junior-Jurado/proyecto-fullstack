const AdministratorController = require('../controllers/administratorsController');

module.exports = (app) => {
    app.post('/api/administrator/register', AdministratorController.register);
}