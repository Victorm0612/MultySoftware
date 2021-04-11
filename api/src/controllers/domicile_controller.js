import domicile from '../models/domicile_model';
import Domicile from '../models/domicile_model';

export async function getDomiciles(req, res){
    try {
        const domiciles = await Domicile.findAll();
        res.json({
            data: domiciles
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
};

export async function getOneDomicile(req, res){
    const { id } = req.params;
    try {
        const domicile = await Domicile.findOne({
            where: { 
                domicile_id: id
            }
        });
        res.json({
            data: domicile
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function create(req, res){
    const { domicile_name, domicile_address, phone, attention_time, domicile_status  } = req.body;
    try {
        let newDomicile = await Domicile.create({
            domicile_name,
            domicile_address,
            phone,
            attention_time,
            domicile_status
        });
        if(newDomicile){
            res.json({
                message: 'SUCCESS!!',
                data: newDomicile
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        }) 
    }
};

export async function updateDomicile(req, res){
    const { id } = req.params;
    const { domicile_name, domicile_address, phone, attention_time, domicile_status } = req.body;

    const domicileFound = await Domicile.findAll({
        attributes: ['domicile_name', 'domicile_address', 'phone', 'attention_time', 'domicile_status'],
        where: {
            domicile_id: id
        }
    });
    if(domicileFound.length > 0){
        domicileFound.forEch(async domicileFound => {
            await Domicile.update({
                domicile_name,
                domicile_address,
                phone,
                attention_time,
                domicile_status
            }, {
                where: {
                    domicile_id: id
                }
            });
        })
    }
    return res.json({
        message: 'domicile updated succesfully'
    })
};

export async function deleteDomicile(req, res){
    const { id } = req.params;
    try {
        const deleteRowCount = Domicile.destroy({
            where: {
                domicile_id: id
            }
        });
        res.json({
            message: 'domicile deleted succesfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })          
    }
}