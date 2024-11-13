const VehiclesController = require('../controllers/vehiclesController');


module.exports = (app) => {
    app.get('/api/vehicles/getAll', VehiclesController.getAll);
    app.get('/api/vehicles/getAvailable', VehiclesController.getAvailable);
    app.get('/api/vehicles/getById/:id', VehiclesController.getById);
    app.put('/api/vehicles/changeUnavailable/:id', VehiclesController.changeUnavailable);
    app.put('/api/vehicles/changeAvailable/:id', VehiclesController.changeAvailable);
}