const RatingController = require('../controllers/ratingsController');

module.exports = (app) => {
    app.get('/api/ratings/getAll', RatingController.getAll);
    app.post('/api/ratings/create', RatingController.create);

}