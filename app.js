require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');
let corsOptions = {
    origin: 'http::/localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const compression = require('compression');
const shouldCompress = (req, res) => {
    if(req.headers['x-no-compression']) {
        return false;
    }

    return compression.filter(req, res);
}

app.use(compression({
    filter: shouldCompress
}));


app.use('/api', require('./app/routes'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to PMS App' });
});

module.exports = app;