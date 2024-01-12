const { DataTypes } = require('sequelize');
const { db } = require('../database/connection');


const Note = db.define('Note', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT
    },
    dateEdited: {
        type: DataTypes.DATE,
        allowNull: false
    },
    archived: {
        type:DataTypes.BOOLEAN
    },
    categories: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

module.exports = Note;