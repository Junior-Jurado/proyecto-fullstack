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

Vehicle.changeStateUnavailable = async (id) => {
    const sql = `
        UPDATE vehicles
        SET availability_status = 'unavailable' 
        WHERE vehicle_id = $1
        RETURNING vehicle_id
    `;
    return db.oneOrNone(sql, id);
}

Vehicle.changeStateAvailable = async (id) => {
    const sql = `
        UPDATE vehicles
        SET availability_status = 'available' 
        WHERE vehicle_id = $1
        RETURNING vehicle_id
    `
    return db.oneOrNone(sql, id);
}


module.exports = Vehicle;
