const HOST = process.env.DB_HOST;
const USER = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DB_NAME;
const DB_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB}?retryWrites=true&w=majority`;

module.exports = {
    DB_URI
};