const db = require('../config/config');
// Importa la librería bcrypt para el hash de contraseñas
const bcrypt = require('bcryptjs');

const Customer = {};

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns {Promise} Promesa que se resuelve con un array de objetos que representan los usuarios encontrados.
 */
Customer.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM 
        customers
    `;
    return db.manyOrNone(sql);
}

module.exports = Customer;
