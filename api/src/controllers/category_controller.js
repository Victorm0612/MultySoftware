import Category from '../models/category_model';

export async function getCategorys(req, res){
    try {
        const categorys = await Category.findAll();
        res.json({
            data: categorys
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
}

export async function getOneCategory(req,res){
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where: {
                category_id: id
            }
        });
        res.json({
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })
    }
}

export async function create(req,res){
    const { cat_name, cat_description, cat_status } = req.body;
    try {
        let newCategory = await Category.create({
            cat_name,
            cat_description,
            cat_status
        });
        if(newCategory){
            res.json({
                message: 'SUCCESS!!',
                data: newCategory
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
}

export async function updateCategory(req,res){
    const { id } = req.params;
    const { cat_name, cat_description, cat_status } = req.body;

    const categoryFound = await Category.findAll({
        attributes: ['cat_name','cat_description','cat_status'],
        where:{
            category_id: id
        }
    });
    if(categoryFound.length > 0){
        categoryFound.forEach(async categoryFound => {
            await Category.update({
                cat_name,
                cat_description,
                cat_status
            },{
                where: {
                    category_id: id
                }
            });
        })
    }
    return res.json({
        message: 'Category updated succesfully'
    })
};

export async function deleteCategory(req, res){
    const { id } = req.params;
    try {
        const deleteRowCount = Category.destroy({
            where:{
                category_id: id
            }
        });
        res.json({
            message: 'Category deleted successfully',
            count: deleteRowCount
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })  
    }
}