const Booking = require('../models/booking');

module.exports = {
    
    async getAll(req, res, next) {
        try {

            const data = await Booking.getAll(); 
            
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener las reservas'
            });
        }
    },

    async getBooking(req, res, next) {
        try {
            const { idUser, idVehicle } = req.params;
    
            // Llamada al método del modelo para obtener la reserva
            const booking = await Booking.getBooking(idUser, idVehicle);
    
            // Verificar si se encontró la reserva
            if (booking) {
                return res.status(200).json(booking);
            } else {
                return res.status(404).json({
                    success: false,
                    message: `No se encontró una reserva para el usuario ${idUser} y el vehículo ${idVehicle}.`
                });
            }
    
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Hubo un problema al intentar obtener la reserva del usuario ${idUser} o del vehículo ${idVehicle}.`
            });
        }
    },

    async create(req, res, next) {
        try {
            const booking = req.body;
            const data = await Booking.create(booking);

            const myData = {
                id: data.booking_id,
                ...booking
            };

            return res.status(201).json({
                success: true,
                message: 'La reserva se realizó correctamente!!',
                data: myData
            })

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error al crear la reserva del automovil.`
            });
        }
    },

    async viewBookingByUser(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Booking.viewBookingByUser(id);

            if (data && Array.isArray(data) && data.length > 0) {
                return res.status(201).json({
                    success: true,
                    message: 'Reserva/s del usuario encontrada/s',
                    data: data
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: `No se encontraron reservas para el usuario ${id}.`
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error al buscar las reservas a este usuario.`
            });
        }

    },

    async deleteBooking(req, res, next) {
        try {
            const { idUser, idVehicle } = req.params;
    
            // Llamada al método del modelo para obtener la reserva
            const booking = await Booking.deleteBooking(idUser, idVehicle);
    
            // Verificar si se encontró la reserva
            if (booking) {
                return res.status(200).json(booking);
            } else {
                return res.status(404).json({
                    success: false,
                    message: `No se encontró una reserva para el usuario ${idUser} y el vehículo ${idVehicle}.`
                });
            }
    
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Hubo un problema al intentar obtener la reserva del usuario ${idUser} o del vehículo ${idVehicle}.`
            });
        }
    },
    


}