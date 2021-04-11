import { FlashOnRounded } from '@material-ui/icons';
import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const payment = sequelize.define('Payment', {
    payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pay_description: {
        type: Sequelize.TEXT
    },
    payment_date: {
        type: Sequelize.DATE
    },
    pay_time: {
        type: Sequelize.TIME
    },
    pay_status: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});

export default payment;