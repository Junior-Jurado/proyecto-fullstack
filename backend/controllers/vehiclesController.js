const Vehicle = require('../models/vehicle');

module.exports = {
    
    async getAll(req, res, next) {
        try {
            const data = await Vehicle.getAll(); 
            // console.log(`Vehiculos: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los vehiculos'
            });
        }
    },
    async getAvailable(req, res, next) {
        try {
            const data = await Vehicle.getAvailable(); 
            return res.status(200).json(data); 
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los vehículos disponibles'
            });
        }
    },

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            
            const vehicle = await Vehicle.getById(id);
            
            if (!vehicle) {
                return res.status(404).json({
                    success: false,
                    message: `Vehículo con id ${id} no encontrado`
                });
            }
            return res.status(200).json(vehicle);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el vehículo'
            });
        }
    }
}