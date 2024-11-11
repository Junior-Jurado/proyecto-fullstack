const BookingsController = require('../controllers/bookingsController');


module.exports = (app) => {
    app.get('/api/bookings/getAll', BookingsController.getAll);
}