import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const users = sequelize.define('users',{
    id_cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    document_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    first_name: {
        type: Sequelize.TEXT,
    },
    last_name: {
        type: Sequelize.TEXT,
    },
    gender: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.INTEGER,
    },
    birthday: {
        type: Sequelize.DATE,
    },

}, {
    timestamps: false
});

export default users;