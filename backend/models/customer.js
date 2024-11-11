const db = require('../config/config');
const bcrypt = require('bcryptjs');

const Customer = {};

Customer.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM 
        customers
    `;
    return db.manyOrNone(sql);
}

Customer.create = async (customer) => {
    const hash = await bcrypt.hash(customer.password, 10);
    const sql = `
    INSERT INTO 
        customers(
            first_name,
            last_name,
            email,
            phone,
            address,
            username,
            password
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;

    return db.oneOrNone(sql,[
        customer.first_name,
        customer.last_name,
        customer.email,
        customer.phone,
        customer.address,
        customer.username,
        hash,
    ]);

}

Customer.login = async (email, password) => {
    try {
        const sql = 'SELECT * FROM customers WHERE email = $1';
        const user = await db.oneOrNone(sql, [email]);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        return {
            success: true,
            message: 'Login exitoso',
            data: {
                id: user.customer_id,
                email: user.email,
                username: user.username
            },
        };
    } catch (error) {
        console.error('Error al intentar hacer login:', error);
        return {
            success: false,
            message: error.message,
        };
    }
};


module.exports = Customer;
