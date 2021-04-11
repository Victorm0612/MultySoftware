import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';
import sale from './sale_model';

const domicile = sequelize.define('Domicile', {
    domicile_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    domicile_name: {
        type: Sequelize.STRING
    },
    domicile_address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    attention_time: {
        type: Sequelize.STRING
    },
    domicile_status: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});

domicile.hasMany(sale, { foreignKey: 'domicile_id', sourceKey: 'domicile_id' })
sale.belongsTo(domicile, { foreignKey: 'domicile_id', sourceKey: 'domicile_id' })

export default domicile