const db = require('../config/config');
const bcrypt  = require('bcryptjs');

const Administrator  = {};

Administrator.create = async (administrator) => {
    const hash = await bcrypt.hash(administrator.password, 10);
    const sql = `
    INSERT INTO
        Administrators(
        first_name,
        last_name,
        email,
        phone,
        password
    )
    VALUES ($1, $2, $3, $4, $5) RETURNING admin_id
    `;
    return db.oneOrNone(sql, [
        administrator.first_name,
        administrator.last_name,
        administrator.email,
        administrator.phone,
        administrator.password,
        hash,
    ]);
};

Administrator.updateVehicleStatus = async (vehicle_id) =>{
    const sql = `
    UPDATE Vehicles
    SET availability_status =
        CASE
            WHEN availability_status = 'available' THEN 'unavailable'
            ELSE 'available'
        END
    WHERE vehicle_id = $1
    RETURNING availability_status
    `;
    return db.oneOrNone(sql, [vehicle_id]);
};

module.exports = Administrator;
