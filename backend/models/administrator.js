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

Administrator.login = async(email, password) => {
    try{
        const sql = 'SELECT * FROM Administrators WHERE email = $1';
        const user = await db.oneOrNone(sql, [email]);
        if(!user){
            throw new Error('Administrador no encontrado');
        }
        const isMatch = password === user.password;
        if(!isMatch){
            throw new Error('Contraseña incorrecta');
        }
        return{
            success: true,
            message: 'Login exitoso',
            data: {
                id: user.admin_id,
                email: user.email,
            },
        };
    }catch(error){
        console.error('Error al intentar hacer login:', error);
        return{
            success: false,
            message: error.message
        };
    }
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
