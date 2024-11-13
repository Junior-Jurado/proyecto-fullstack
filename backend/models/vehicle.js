const db = require('../config/config');


const Vehicle = {};

Vehicle.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM 
        vehicles
    `;
    return db.manyOrNone(sql);
}

Vehicle.getAvailable = () => {
    const sql = `
    SELECT 
        *
    FROM 
        vehicles
    WHERE
        availability_status = 'available'
    `;
    return db.manyOrNone(sql);
}

Vehicle.getById = async (id) => {
    const sql = `
    SELECT 
        *
    FROM 
        vehicles
    WHERE
        vehicle_id = $1
    `;
    return db.oneOrNone(sql, id);
}


module.exports = Vehicle;
