const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');


module.exports = {
    
    async getAll(req, res, next) {
        try {
            const data = await Customer.getAll(); 
            console.log(`Clientes: ${data}`);
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
            const user = req.body;
            const data = await User.create(user);

            const token = jwt.sign({id: data.id, email: user.email},
                keys.secretOrKey, {
                //expiresIn
            });
            

            const myData = {
                id: data.id,
                usuario: user.user_name,
                email: user.email,
                rol: user.rol,
                session_token: `JWT ${token}`
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
    }
}
