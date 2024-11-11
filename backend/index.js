if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

/*
* RUTAS
*/
const customers = require('./routes/customerRoute');
const vehicles = require('./routes/vehicleRoute')
const admintrators  = require('./routes/administratorRoute');

const port  = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.disable('x-powered-by');

app.set('port', port);

// Llamando a las rutas
customers(app);
vehicles(app);
admintrators(app);

server.listen(port, '0.0.0.0', function() {
    console.log("API projects " + process.pid + " iniciada ...\nEn el puerto " + port);
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports = {
    app: app,
    server: server
}
