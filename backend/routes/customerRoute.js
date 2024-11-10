const CustomersController = require('../controllers/customersController');


module.exports = (app) => {
    app.get('/api/customers/getAll', CustomersController.getAll)
}