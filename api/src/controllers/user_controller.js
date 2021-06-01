const models = require("../models/index");
import sequelize from 'sequelize'

export async function getUsers(req, res){
    try {
        const users = await models.User.findAll();
        res.json({
            data: users
        })        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })        
    }
};

export async function getOneUser(req, res){
    const { id } = req.params;
    try {
        const user = await models.User.findOne({
            where: {
                id: id
            }
        });
        res.json({
            data: user
        })        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })   
    }
};

export async function getBirthdayUser(req, res){
    try {
        const user = await models.User.findAll({
            where: {
                birthday: sequelize.where(sequelize.literal('extract(MONTH FROM birthday)'), '01')
            }
        });
        res.json({
            data: user
        })        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })   
    }
};

export async function getClientUser(req, res){
    try {
        const user = await models.User.findAll({
            where: {
               user_type: 1 //Cliente 1, Admin 2, trabajador 3
            }
        });
        res.json({
            data: user
        })        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })   
    }
};

export async function create(req, res){

    const { document_type, document_id, first_name, last_name, gender, phone, birthday, user_type, user_status, email, password } = req.body;
    try {
        let newUser = await models.User.create({
            document_type,
            document_id,
            first_name,
            last_name,
            gender,
            phone,
            birthday,
            user_type,
            user_status,
            email,
            password
        });
        if(newUser){
            res.json({
                message: 'SUCCESS!!',
                data: newUser
            });
        }
    } catch (error) {
        let errorMessage = `${error}`;
        let flag = errorMessage.substring(errorMessage.indexOf('«') + 1, errorMessage.length-1);

        const options ={
            'Users_document_id_key' : 'Su documento de identidad ya se encuentra registrado en nuestra página web.',
            'Users_email_key' : 'Su email ya se encuentra registrado en nuestra página web.',
            'default': `Algo salió mal:  ${error}`,
        }

        res.status(500).json({
            message: options[flag],
            data: {}
        })
    }
};

export async function updateUser(req, res){
    const { id } = req.params;
    const { document_type, document_id, first_name, last_name, gender, phone, birthday, user_type, user_status, email, password } = req.body;
    const userFound = await models.User.findAll({
        attributes: ['document_type','document_id', 'first_name', 'last_name', 'gender', 'phone', 'birthday', 'user_type', 'user_status'],
        where:{
            id: id
        }
    });
    if(userFound.length > 0){
        userFound.forEach(async userFound  => {
            await models.User.update({
                document_type,
                document_id, 
                first_name, 
                last_name, 
                gender, 
                phone, 
                birthday,
                user_type,
                user_status,
                email,
                password
            },{
                where: {
                    id: id
                }
            });
        })
    }
    return res.json({
        message: 'user updated successfully'
    })
};

export async function deleteUser(req, res){
    const { id } = req.params;
    try {
        const deleteRowCount = models.User.destroy({
            where: {
                id: id
            }
        });
        res.json({
            message: 'User deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })   
    }
};