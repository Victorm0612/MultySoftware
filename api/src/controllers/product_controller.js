import Product from '../models/product_model';

export async function getProducts(req, res){
    try {
        const products = await Product.findAll();
        res.json({
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
};

export async function getOneProduct(req, res){
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: {
                product_id: id
            }
        });
        res.json({
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
}

export async function create(req, res){
    const { pro_description, pro_image, price, category_id, discount_id, pro_status, percentaje_Iva } = req.body;
    try {
        let newProduct = await Product.create({
            pro_description,
            pro_image,
            price,
            category_id,
            discount_id,
            pro_status,
            percentaje_Iva
        });
        if(newProduct){
            res.json({
                message: 'SUCCESS',
                data: newProduct
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
}

export async function updateProduct(req, res){
    const { id } = req.params;
    const { pro_description, pro_image, price, category_id, discount_id, pro_status, percentaje_Iva } = req.body;

    const productFound = await Product.findAll({
        attributes: ['pro_description','pro_image','price','category_id','discount_id','pro_status','percentaje_Iva'],
        where: {
            product_id: id
        }
    });
    if(productFound.length > 0){
        productFound.forEach(async productFound => {
            await Product.update({
                pro_description,
                pro_image,
                price,
                category_id,
                discount_id,
                pro_status,
                percentaje_Iva
            }, {
                where: {
                    product_id: id
                }
            });
        })
    }
    return res.json({
        message: 'product updated succesfully'
    })
}

export async function deleteProduct(req, res){
    const { id } = req.params;
    try {
        const deleteRowCount = Product.destroy({
            where: {
                product_id: id
            }
        });
        res.json({
            message: 'product delected succesfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
}