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
module.exports = Vehicle;
