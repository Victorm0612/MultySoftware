import Sequelize from 'sequelize';
import{ sequelize } from '../database/database';
import sale from './sale_model';

const user = sequelize.define('Users',{
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

user.hasMany(sale, { foreignKey: 'docId', sourceKey: 'document_id'})
sale.belongsTo(user, { foreignKey: 'docId', sourceKey: 'document_id' })

export default user;