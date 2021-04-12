import Sale from '../models/sale_model';

export async function getSales(req,res){
    try {
        const sales = await Sale.findAll();
        res.json({
            data: sales
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
}

export async function getOneSale(req,res){
    const { id } = req.params;
    try {
        const sale = await Sale.findOne({
            where: {
                sale_id: id
            }
        });
        res.json({
            data: sale
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
};

export async function create(req, res){
    const { sale_id, sale_date, sale_time, docId, domicile_id, sale_status } = req.body;
    try {
        let newSale = await Sale.create({
            sale_id,
            sale_date,
            sale_time,
            docId,
            domicile_id,
            sale_status
        });
        if(newSale){
            res.json({
                message: 'SUCCESS!!',
                data: newSale
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
};

export async function updateSale(req, res){
    const { id } = req.params;
    const { sale_date, sale_time, docId, domicile_id, sale_status } = req.body;

    const saleFound = await Sale.findAll({
        attribute: ['sale_date','sale_time','docId','domicile_id','sale_status'],
        where:{
            sale_id: id
        }
    });
    if(saleFound.length > 0){
        saleFound.forEach(async saleFound => {
            await Sale.update({
                sale_date,
                sale_time,
                docId,
                domicile_id,
                sale_status
            },{
                where: {
                    sale_id: id
                }
            });
        })
    }
    return res.json({
        message: 'sale updated succesfully'
    })
};

export async function deleteSale(req, res){
    const { id } = req.params;
    try {
        const deleteRowCount = Sale.destroy({
            where: {
                sale_id: id
            }
        });
        res.json({
            mesage: 'sale deleted succesfuly',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })      
    }
};