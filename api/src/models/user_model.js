import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const user = sequelize.define('User',{
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
        type: Sequelize.STRING,
    },
    birthday: {
        type: Sequelize.DATE,
    },
    user_type: {
        type: Sequelize.INTEGER,
    },
    user_status: {
        type: Sequelize.BOOLEAN,
    }

}, {
    timestamps: false
});

export default user;