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

export async function create(req, res){
    const { document_type, document_id, first_name, last_name, gender, phone, birthday } = req.body;
    try {
        let newUser = await User.create({
            id_user,
            document_type,
            document_id,
            first_name,
            last_name,
            gender,
            phone,
            birthday
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

export async function getOneUser(req, res){
    const { id } = req.params;
    try {
        const user = await User.findOne({
            where: {
                id_cliente: id
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

export async function updateUser(req, res){
    const { id } = req.params;
    const { document_id, first_name, last_name, gender, phone, birthday } = req.body;

        const userFound = await User.findAll({
            attributes: ['document_id', 'first_name', 'last_name', 'gender', 'phone', 'birthday'],
            where:{
                id_cliente: id
            }
        });
        if(userFound.length > 0){
            userFound.forEach(async userFound  => {
                await User.update({
                    document_id, 
                    first_name, 
                    last_name, 
                    gender, 
                    phone, 
                    birthday
                },{
                    where: {
                        id_cliente: id
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
                id_cliente: id
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
