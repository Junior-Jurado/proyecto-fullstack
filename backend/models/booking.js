const db = require('../config/config');


const Booking = {};

Booking.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM 
        bookings
    `;
    return db.manyOrNone(sql);
}

module.exports = Booking;