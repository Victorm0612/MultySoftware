import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const user = sequelize.define('Usuario',{
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    document_type:{
        type: Sequelize.INTEGER,
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
    type: {
        type: Sequelize.INTEGER,
    },
    state: {
        type: Sequelize.INTEGER,
    }

}, {
    timestamps: false
});

export default user;