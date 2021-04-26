import Discount from '../models/discount_model';

export async function getDiscounts(req, res){
    try {
        const discounts = await Discount.findAll();
        res.json({
            data: discounts
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function getOneDiscount(req, res){
    const { id } = req.params;
    try {
        const discount = await Discount.findOne({
            where: {
                discount_id: id
            }
        });
        res.json({
            data: discount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function create(req, res){
    const { title, dis_description, ini_date, final_date, discount_status, dis_value } = req.body;
    try {
        let newDiscount = await Discount.create({
            title,
            dis_description,
            ini_date,
            final_date,
            discount_status,
            dis_value
        });
        if(newDiscount){
            res.json({
                message: 'SUCCESS!!',
                data: newDiscount
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })         
    }
};

export async function updateDiscount(req, res){
    const { id } = req.params;
    const { title, dis_description, ini_date, final_date, discount_status, dis_value } = req.body;

    const discountFound = await Discount.findAll({
        attributes: ['title','dis_description','ini_date','final_date','discount_status','dis_value'],
        where:{
            discount_id: id
        }
    });
    if(discountFound.length > 0){
        discountFound.forEach(async discountFound => {
            await Discount.update({
                title,
                dis_description,
                ini_date,
                final_date,
                discount_status,
                dis_value
            }, {
                where: {
                    discount_id: id
                }
            });
        })
    }
    return res.json({
        message: 'discount updated succesfully'
    })
};

export async function deleteDiscount(req, res){
    const { id } = req.params;
    try{
        const deleteRowCount = Discount.destroy({
            where: {
                discount_id: id
            }
        });
        res.json({            
            message: 'Discount deleted successfully',
            count: deleteRowCount
            })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })   
    }
};