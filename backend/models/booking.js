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

Booking.getBooking = (idUser, idVehicle) => {
    const sql = `
    SELECT 
        * 
    FROM 
        bookings
    WHERE 
        customer_id = $1
    AND 
        vehicle_id = $2`;
    
    return db.oneOrNone(sql, [idUser, idVehicle]);
}

Booking.create = (booking) => {
    const sql = `
    INSERT INTO 
        bookings (
            customer_id, 
            vehicle_id, 
            start_date, 
            end_date, 
            pickup_location, 
            dropoff_location,
            description
        ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING booking_id ;`;

    return db.oneOrNone(sql, [
        booking.customer,
        booking.vehicle,
        booking.start_date,
        booking.end_date,
        booking.pickup,
        booking.dropoff,
        booking.description
    ]);

} 

Booking.viewBookingByUser = (idUser) => {
    const sql = `
        SELECT 
            * 
        FROM 
            Bookings 
        WHERE 
            customer_id = $1
        RETURNING vehicle_id
    `;

    return db.oneOrNone(sql, idUser);
}

module.exports = Booking;