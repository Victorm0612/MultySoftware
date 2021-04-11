import User from '../models/user_model';

export async function getUsers(req, res){
    try {
        const users = await User.findAll();
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
        const user = await User.findOne({
            where: {
                userId: id
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
    const { document_type, document_id, first_name, last_name, gender, phone, birthday, user_type, user_status } = req.body;
    try {
        let newUser = await User.create({
            document_type,
            document_id,
            first_name,
            last_name,
            gender,
            phone,
            birthday,
            user_type,
            user_status
        });
        if(newUser){
            res.json({
                message: 'SUCCESS!!',
                data: newUser
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
};

export async function updateUser(req, res){
    const { id } = req.params;
    const { type_document, document_id, first_name, last_name, gender, phone, birthday, user_type, user_status } = req.body;

        const userFound = await User.findAll({
            attributes: ['type_document','document_id', 'first_name', 'last_name', 'gender', 'phone', 'birthday', 'user_type', 'user_status'],
            where:{
                userId: id
            }
        });
        if(userFound.length > 0){
            userFound.forEach(async userFound  => {
                await User.update({
                    type_document,
                    document_id, 
                    first_name, 
                    last_name, 
                    gender, 
                    phone, 
                    birthday,
                    user_type,
                    user_status
                },{
                    where: {
                        userId: id
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
        const deleteRowCount = User.destroy({
            where: {
                userId: id
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
