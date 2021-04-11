import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';
import product from './product_model';

const discount = sequelize.define('Discount', {
    discount_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    dis_description: {
        type: Sequelize.TEXT
    },
    ini_date: {
        type: Sequelize.DATE
    },
    final_date: {
        type: Sequelize.DATE
    },
    date_status: {
        type: Sequelize.BOOLEAN
    },
    dis_value: {
        type: Sequelize.DOUBLE
    }
},{
    timestamps: false
});

discount.hasMany(product, {foreignKey: 'discount_id', sourceKey: 'discount_id' })
product.belongsTo(discount, { foreignKey: 'discount_id', sourceKey: 'discount_id' })

export default discount