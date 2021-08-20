const models = require("../models/index");
import sequelize from sequelize

export async function getCredits(res){
    try {
        const credits = await models.Credit.findAll()
        res.json({ 
            data: credits
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Something goes wrong' + error,
            data: {}
        })
    }
}

export async function getOneCredit(req,res){
    const { id } = req.params
    try {
        const bill = await model.Credit.findOne({
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

export async function create(req, res){
    const { credit_number, approval_number, fees_number, amount, payment_id, bank } = req.body;
    try {
        let newCredit = await model.Credit.create({
            credit_number,
            approval_number,
            fees_number,
            amount,
            payment_id,
            bank
        });
        if(newCredit){
            res.json({
                message: 'SUCCESS',
                data: newCredit
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
}

export async function updateCredit(req,res){
    const { credit_number } = req.params
    const { approval_number, fees_number, amount, payment_id, bank } = req.body
    const creditFound = await model.Credit.findAll({
        attributes: ['approval_number','fees_number','amount','payment_id', 'bank'],
        where: {
            credit_number: credit_number
        }
    });
    if(creditFound.length > 0){
        creditFound.forEach(async creditFound => {
            await models.Credit.update({
                approval_number,
                fees_number,
                amount,
                payment_id,
                bank
            },{
                where: {
                credit_number: credit_number
                }
            })
        })
    }
    return res.json({
        message: 'Credit updated successfully'
    })
}

export async function deleteCredit(req,res) {
    const { credit_number } = req.params
    try {
        const deleteRowCount = model.Credit.destroy({
            where:{
                credit_number: credit_number
            }
        })
        res.json({
            message: 'Credit deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting credit' + error
        })
    }
}