const BookingsController = require('../controllers/bookingsController');


module.exports = (app) => {
    app.get('/api/bookings/getAll', BookingsController.getAll);
    app.get('/api/bookings/user/:idUser/vehicle/:idVehicle', BookingsController.getBooking);
    app.post('/api/bookings/create', BookingsController.create);
}