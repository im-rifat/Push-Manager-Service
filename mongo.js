const dbConfig = require('./app/configs/db.config');

const db = require('./app/models');
const Role = db.role;
const AppType = db.apptype;

const initDB = async () => {
    let initiated = false;

    try {
        await db.mongoose.connect(dbConfig.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        initiated = true;
    } catch(err) {
        process.exit();
        return;
    }

    if(initiated) {
        initial();
    }
}

async function initial() {
    try {
        const count = await Role.estimatedDocumentCount().exec();
        if(count == 0) {
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
    } catch(err) {
    }

    try {
        const count = await AppType.estimatedDocumentCount().exec();
        if(count == 0) {
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
    } catch(err) {
    }
}

module.exports = {
    initDB
};