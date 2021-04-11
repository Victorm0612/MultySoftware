import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const sale = sequelize.define('Sale',{
    sale_number: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sale_date: {
        type: Sequelize.DATE
    },
    sale_time: {
        type: Sequelize.TIME
    },
    docId: {
        type: Sequelize.INTEGER
    },
    domicile_id: {
        type: Sequelize.INTEGER
    },
    sale_status: {
        type: Sequelize.BOOLEAN
    }
},{
    timestamps:false
});

export default sale