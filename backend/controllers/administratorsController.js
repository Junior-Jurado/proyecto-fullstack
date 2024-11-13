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
    },
    async update(req, res, next){
        try{
            const { vehicle_id } = req.body;
            const data = await Administrator.updateVehicleStatus(vehicle_id);
            if(data){
                return res.status(200).json({
                    succes: true,
                    message: 'Estado del vehículo actualizado correctamente',
                    data,
                });
            }else{
                return res.status(404).json({
                    succes: false,
                    message: 'Vehículo no encontrado',
                });
            }
        }catch(error){
            console.error(`Error: ${error}`);
            return res.status(500).json({
                succes: false,
                message: 'Hubo un error al actualizar el estado del vehículo',
                error,
            });
        }
    },
    async login(req, res, next){
        try{
            const { email, password } = req.body;
            const result = await Administrator.login(email, password);
            if(result.success){
                return res.status(200).json(result);
            }else{
                return res.status(400).json({
                    succes: false,
                    message: result.message,
                });
            }
        }catch(error){
            console.error('Error en el login del administrador:', error);
            return res.status(500).json({
                succes: false,
                message: 'Hubo un error al procesar el login del administrador',
                error: error.message,
            });
        }
    }
}