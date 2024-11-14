const Rating = require('../models/rating');

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await Rating.getAll(); 
            
            return res.status(201).json({
                success: true,
                message: "Lista de comentarios",
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

    async create(req, res, next) {
        try {
            const rating = req.body;
            const data = await Rating.create(rating);

            const myData = {
                id: data.rating_id,
                ...rating
            };

            return res.status(201).json({
                success: true,
                message: 'La reseña se realizó correctamente!!',
                data: myData
            })

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: `Error al crear la reseña del servicio.`
            });
        }
    },
}