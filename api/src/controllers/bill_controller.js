const models = require("../models/index");
import sequelize from 'sequelize'

export async function getBill(res){
    try {
        const bills = await models.Bill.findAll();
        res.json({
            data: bills
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error,
            data: {}
        })
    }
}

export async function getOneBil(req,res){
    const { id } = req.params
    try {
        const bill = await models.Bill.findOne({ 
            where: { 
                id: id
            }
        })
        res.json({
            data: bill
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function create(req,res){
    const { nit, sale_id, payment_id, bill_time, bill_date, subtotal, totalIva, total_discount, total_payment, bill_status } = req.body
    try {
        let newBill = await models.bill.create({
            nit,
            sale_id,
            payment_id,
            bill_time,
            bill_date,
            subtotal,
            totalIva,
            total_discount,
            total_payment,
            bill_status
        });
        if(newBill){
            res.json({
                message: 'SUCCESS',
                data: newBill
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error,
            data: {}
        })        
    }
}

export async function updateBill(req,res){
    const { id } = req.params
    const { nit, sale_id, payment_id, bill_time, bill_date, subtotal, totalIva, total_discount, total_payment, bill_status} = req.body
    
    const billFound = await models.Bill.findAll({
        attributes: ['nit','sale_id','payment_id','bill_time','bill_date','subtotal','totalIva','total_discount','total_payment','bill_status'],
        where: {
            id: id
        }
    });
    if(billFound.length > 0){
        billFound.forEach(async billFound => {
            await models.Bill.update({
                nit,
                sale_id,
                payment_id,
                bill_time,
                bill_date,
                subtotal,
                totalIva,
                total_discount,
                bill_status
            },{
                where: {
                    id: id
                }
            });
        })
    }
    return res.json({
        message: 'Bill updated successfully'
    })    
}

export async function deleteBill(req,res){
    const { id } = req.params
    try {
        const deleteRowCount = models.Bill.destory({
            where: {
                id: id
            }
        });
        res.json({
            message: 'Bill deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}