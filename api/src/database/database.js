
import Sequelize from 'sequelize';
const keys = '../config/keys';

export const sequelize = new Sequelize( 'postgres://postgres:postgres@localhost:5432/postgres', //keys.posgresqlURI,
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        loggin: false
    }
);

/**
new Sequalize(
    'multysoftware',
    'postgres',
    '061299victor',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);
 */