const Customer = require('../models/customer');

module.exports = {
    
    async getAll(req, res, next) {
        try {
            const data = await Customer.getAll(); 
            
            return res.status(201).json({
                success: true,
                message: "Lista de clientes",
                data: data
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los clientes'
            });
        }
    },

    async register(req, res, next) {
        try {
            const costumer = req.body;
            const data = await Customer.create(costumer);            

            const myData = {
                id: data.customer_id,
                ...costumer
            };

            return res.status(201).json({
                success: true,
                message: 'El registro se realizó correctamente!!',
                data: myData
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            if (error.code === '23505') {
                if (error.constraint === 'users_user_name_key') {
                    return res.status(400).json({ success: false, message: 'El nombre de usuario ya está en uso', error:error });
                } else if (error.constraint === 'users_email_key') {
                    return res.status(400).json({ success: false, message: 'El correo electrónico ya está en uso', error:error });
                }
            } else {
                console.error('Error al crear el usuario:', error);
                return res.status(500).json({ success: false, message: 'Hubo un error al registrar al usuario', error: error });
            }
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await Customer.login(email, password);
    
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json({
                    success: false,
                    message: result.message,
                });
            }
        } catch (error) {
            console.error('Error en el login:', error);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error al procesar el login',
                error: error.message,
            });
        }
    }
}
