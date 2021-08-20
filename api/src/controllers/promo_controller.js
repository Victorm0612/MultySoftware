const model = require('../models/index')
import sequelize from 'sequelize'
import promo from '../models/promo'

export async function getPromos(res){
    try {
        const promos = await models.Promo.findAll()
        res.json({
            data: promos
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function getOnePromo(req,res){
    const { id } = req.params
    try {
        const promo = await models.Promo.findOne({
            where: {
                id: id
            }
        })
        res.json({
            data: promo
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function create(req,res){
    const { ini_date, final_date, promo_name, promo_description } = req.body
    try {
        let newPromo = await models.Promo.create({
            ini_date,
            final_date,
            promo_name,
            promo_description
        })
        if(newPromo){
            res.json({
                mesagge: 'SUCCESS!!',
                data: newPromo
            })
        }
    } catch (error) {
        res.status(500).json({
            mesagge: 'Something goes wrong' + error,
            data: {}
        })
    }
}

export async function updatePromo(req,res){
    const { id } = req.body
    const [ ini_date, final_date, promo_name, promo_description ] = req.body
    const promoFound = await models.Promo.findAll({
        attributes: ['ini_date','final_date','promo_name','promo_description'],
        where:{
            id: id
        }
    })
    if(promoFound.length > 0){
        promoFound.forEach(async promoFound => {
            ini_date,
            final_date,
            promo_name,
            promo_description
        },{
            where: {
                id: id
            }
        })
    }
    return res.json({
        mesagge: 'Promo updated succesfully'
    })
}

export async function deletePromo(req,res){
    const { id } = req.params
    try {
        const deleteRowCount = models.Promo.destroy({
            where:{
                id: id
            }
        })
        res.json({
            message: 'Promo deleted succesfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting Promo'
        })
    }
}