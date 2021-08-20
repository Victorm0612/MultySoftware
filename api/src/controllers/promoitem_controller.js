const models = require('../models/index')
import sequelize from 'sequelize'

export async function getPromoItems(res){
    try {
        const promoItems = await models.PromoItem.findAll()
        res.json({
            data: promoItems
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function getOnePromoItem(req,res){
    const { id } = req.params
    try {
        const promoItem = models.PromoItem.findOne({
            where: {
                id: id
            }
        })
    } catch (error) {
        
    }
}

export async function create(req,res){
    const { promo_id, product_id, amount } = req.body
    try {
        let newPromoItem = await models.PromoItem.create({
            promo_id,
            product_id,
            amount
        })
        res.json({
            data: newPromoItem
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function updatePromoItem(req,res){
    const { id } = req.params
    const { promo_id, product_id, amount } = req.body
    const promoItemFound = await models.PromoItem.findAll({
        attributes: ['promo_id','product_id','amount'],
        where:{
            id: id
        }
    })
    if(promoItemFound.length > 0){
        promoItemFound.forEach(async promoItemFound => {
            await models.promoItemFound.update({
                promo_id,
                product_id,
                amount
            },{
                where:{
                    id: id
                }
            })
        })
    }
    return res.json({
        message: 'Promo updated successfully'
    })
}

export async function deletePromoItem(req,res){
    const { id } = req.params
    try {
        const deleteRowCount = await models.PromoItem.destroy({
            where:{
                id: id
            }
        })
        res.json({
            message: 'PromoItem deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting PromoItem'
        })
    }
}