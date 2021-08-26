import models from ('../models/index')
import sequelize from 'sequelize'

export async function getSaleItems(res){
    try {
        const saleItems = await models.SaleItem.findAll()
        res.json({
            data: saleItems
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function getOneSaleItem(req,res){
    const { id } = req.params
    try {
        const saleItem = await models.SaleItem.findOne({
            id: id
        })
        res.json({
            data: saleItem
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function create(req,res){
    const { sale_id, amount, totalIva, subtotal, item_total, total_discount, product_id } = req.body
    try {
        const newSaleItem = await models.SaleItem.create({
            sale_id,
            amount,
            totalIva,
            subtotal,
            item_total,
            total_discount,
            product_id
        })
        if(newSaleItem){
            res.json({
                message: 'SUCCESS',
                data: newSaleItem
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
        })
    }
}

export async function updateSaleItem(req,res){
    const { id } = req.params
    const { sale_id, amount, totalIva, subtotal, item_total, total_discount} = req.body
    const saleItemFound = await models.SaleItem.findAll({
        attributes: ['sale_id','amount','totalIva','subtotal','item_total','total_discount'],
        where: {
            id: id
        }
    })
    if(saleItemFound.length > 0){
        saleItemFound.forEach(async saleItemFound => {
            models.SaleItem.update({
                sale_id,
                amount,
                totalIva,
                subtotal,
                item_total,
                total_discount
            }, {
                where: {
                    id: id
                }
            })
        })
    }
    return res.json({
        message: 'SaleItem updated successfully'
    })
}

export async function deleteSaleItem(req,res){
    const { id } = req.params
    try {
        const deleteRowCount = await models.SaleItem.destroy({
            where: {
                id: id
            }
        })
        res.json({
            message: 'SaleItem deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting SaleItem'
        })
    }
}