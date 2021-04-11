import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';

const product = sequelize.define('Product', {
    product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pro_description: {
        type: Sequelize.TEXT
    },
    pro_image: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER
    },
    category_id: {
        type: Sequelize.INTEGER
    },
    discount_id: {
        type: Sequelize.INTEGER
    },
    pro_status: { 
        type: Sequelize.BOOLEAN
    },
    percentaje_Iva: {
        type: Sequelize.DOUBLE
    }
}, {
    timestamps: false
});

export default product