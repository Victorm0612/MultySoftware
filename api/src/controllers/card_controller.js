const models = require("../models/index");
import sequelize from sequelize

export async function getCards(res){
    try {
        const cards = await models.Card.findAll()
        res.json({ 
            data: cards
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Something goes wrong' + error,
            data: {}
        })
    }
}

export async function getOneCard(req,res){
    const { id } = req.params
    try {
        const card = await model.Card.findOne({
            where: {
            id: id 
        }
        })
        res.json({
            data: card
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function create(req, res){
    const { card_number, owner_id, exp_date, bank } = req.body;
    try {
        let newCard = await model.Card.create({
            card_number,
            owner_id,
            exp_date,
            bank
        });
        if(newCard){
            res.json({
                message: 'SUCCESS',
                data: newCard
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
}

export async function updateCard(req,res){
    const { card_number } = req.params
    const { owner_id, exp_date, bank } = req.body
    const cardFound = await model.Card.findAll({
        attributes: ['card_number', 'owner_id', 'exp_date', 'bank'],
        where: {
            card_number: card_number
        }
    });
    if(cardFound.length > 0){
        cardFound.forEach(async cardFound => {
            await models.Card.update({
                owner_id,
                exp_date,
                bank
            },{
                where: {
                    card_number: card_number
                }
            })
        })
    }
    return res.json({
        message: 'Card updated successfully'
    })
}

export async function deleteCard(req,res) {
    const { card_number } = req.params
    try {
        const deleteRowCount = model.Card.destroy({
            where:{
                card_number: card_number
            }
        })
        res.json({
            message: 'Card deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting Card' + error
        })
    }
}