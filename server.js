const app = require('./app');
const mongo = require('./mongo');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('app listening.');
    mongo.initDB();
});