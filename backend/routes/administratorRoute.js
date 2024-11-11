const AdministratorController = require('../controllers/administratorsController');

module.exports = (app) => {
    app.post('/api/administrator/register', AdministratorController.register);
    app.put('/api/administrator/updateStatus', AdministratorController.update);
}