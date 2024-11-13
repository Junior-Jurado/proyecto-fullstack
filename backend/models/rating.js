const db = require('../config/config')

const Rating = {};

Rating.getAll = () => {
    const sql = `
    SELECT 
        *
    FROM 
        ratings
    `;
    return db.manyOrNone(sql);
}

Rating.create = (rating) => {
    const sql = `
    INSERT INTO 
        ratings(
            booking_id,
            score,
            comment,
            sent_date
        )
    VALUES($1, $2, $3, $4) RETURNING rating_id
    `;

    return db.oneOrNone(sql,[
        rating.booking_id,
        rating.score,
        rating.comment,
        rating.sent_date
    ]);
}

module.exports = Rating;