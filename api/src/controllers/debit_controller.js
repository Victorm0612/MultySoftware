const models = require("../models/index");
import sequelize from 'sequelize'

export async function getDebits(res){
    try {
        const debits = await models.Debit.findAll()
        res.json({
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
}

export async function getOneDebit(req,res){
    const { credit_number } = req.params
    try{
        const debit = await models.Debit.findOne({
            where: {
                credit_number: credit_number
            }
        })
        res.json({
            data: debit
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error
        })
    }
}

export async function create(req,res){
    const { debit_number, debit_type, payment_id, bank } = req.body 
    try {
        let newDebit = await models.Debit.create({
            debit_number,
            debit_type,
            payment_id,
            bank
        })
        if(newDebit){
            res.json({
                message: 'SUCCESS',
                data: newDebit
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }  
}

export async function updateDebit(req,res){
    const { debit_number } = req.params
    const { debit_type, payment_id, bank } = req.body
    const debitFound = await models.Debit.findAll({
        attributes: ['debit_type','payment_id','bank'],
        where: {
            debit_number: debit_number
        }
    })
    if(debitFound.length > 0){
        debitFound.forEach(async debitFound =>{
            await models.Debit.update({
                debit_type,
                payment_id,
                bank
            }, {
                where: {
                    debit_number: debit_number
                }
            })
        })
    }
    return res.json({
        message: 'Debit updated successfully'
    })
}

export async function deleteDebit(req,res){
    const { debit_number } = req.params;
    try {
        const deleteRowCount = models.Debit.destroy({
            where: {
                debit_number: debit_number
            }
        })
        res.json({
            message: 'Debit deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting debit'
        })
    }
}