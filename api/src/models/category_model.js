import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';
import product from './product_model';

const category = sequelize.define('Category', {
    category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cat_name: {
        type: Sequelize.STRING
    },
    cat_description: {
        type: Sequelize.TEXT
    },
    cat_status: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false
});

category.hasMany(product, { foreignKey: 'category_id', sourceKey: 'category_id' })
product.belongsTo(category, { foreignKey: 'category_id', sourceKey: 'category_id' })

export default category