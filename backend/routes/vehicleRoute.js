const VehiclesController = require('../controllers/vehiclesController');


module.exports = (app) => {
    app.get('/api/vehicles/getAll', VehiclesController.getAll);
    app.get('/api/vehicles/getAvailable', VehiclesController.getAvailable);
    app.get('/api/vehicles/getById/:id', VehiclesController.getById);
}