const CustomersController = require('../controllers/customersController');


module.exports = (app) => {
    app.get('/api/customers/getAll', CustomersController.getAll);
    app.post('/api/customers/register', CustomersController.register);
    app.post('/api/customers/login', CustomersController.login);
}