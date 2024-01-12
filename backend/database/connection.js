const { Sequelize } = require('sequelize');

const db = new Sequelize('ensolvers_challenge', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


const dbConnection = async() => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    dbConnection,
    db
}