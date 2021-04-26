import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const bank = sequelize.define('Bank', {
    bank_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bank_name: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});