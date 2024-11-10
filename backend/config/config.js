require('dotenv').config();

const promise = require("bluebird")
const options = {
    promiseLib: promise,
    query: (e) =>{}
}

// const https = require('https');

// // Opción para deshabilitar la validación del certificado
// const httpsAgent = new https.Agent({
//   rejectUnauthorized: false
// });

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});

const databaseConfig = {
    'host': '127.0.0.1',
    'port': 5432,
    'database': process.env.DATABASE,
    'user': process.env.USER,
    'password': process.env.PASSWORD,
    'ssl': false
};

const db = pgp(databaseConfig);

module.exports = db;