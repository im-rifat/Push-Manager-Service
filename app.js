require('dotenv').config();

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
let corsOptions = {
    origin: 'http::/localhost:8081'
};
app.use(cors(corsOptions));

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

app.use(require('helmet')());


app.use('/api', require('./app/routes'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to PMS App' });
});

module.exports = app;