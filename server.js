require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dbConfig = require('./app/configs/dbConfig');

const app = express();

let corsOptions = {
    origin: 'http::/localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./app/routes'));

const db = require('./app/models');
const Role = db.role;
const AppType = db.apptype;

db.mongoose.connect(dbConfig.DB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        console.log('successfully connected to db');

        initial();

        const PORT = process.env.PORT || 8080

        app.listen(PORT, () => {
            console.log('app listening.');
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to PMS App' });
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (err) {
            console.log(err);
        }

        if (!err && count == 0) {

            for (let i = 0; i < db.Roles.length; i++) {
                new Role({
                    name: db.Roles[i]
                }).save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`added ${db.Roles[i]} roles to collection`);
                    }
                });
            }
        }
    });

    AppType.estimatedDocumentCount((err, count) => {
        if(err) {
            console.log(err);
        }

        if(!err && count == 0) {
            for(let i = 0; i < db.AppTypes.length; i++) {
                new AppType({
                    name: db.AppTypes[i]
                }).save((err, apptype) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(`${apptype.name} added to collecton`);
                    }
                });
            }
        }
    })
}