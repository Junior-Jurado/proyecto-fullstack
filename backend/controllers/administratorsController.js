const Administrator = require('../models/administrator');


module.exports = {
    async register(req, res, next){
        try{
            const admin = req.body;
            const data = await Administrator.create(admin);
            const myData = {
                admin_id: data.admin_id,
                ...admin
            };
            return res.status(201).json({
                succes: true,
                message: 'El registro se realizó correctamente!',
                data: myData
            });
        }catch (error){
            console.log(`Error: ${error}`);
            if(error.constraint === 'administrators_email_key'){
                return res.status(400).json({succes: false, message: 'El correo electrónico ya está en uso', error: error});
            }else{
                console.log('Error al crear el usuario', error);
                return res.status(500).json({succes: false, message: 'Hubo un error al registrar al administrador', error: error});
            }
        }
    }
}