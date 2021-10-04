const models = require("../models/index")
import sequelize from 'sequelize'

export async function getIngredientItems(res){
    try {
        const ingredientItems = await models.IngredientItem.findAll()
        res.json({
            data: ingredientItems
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error,
            data: {}
        })
    }
}

export async function getOneIngredientItem(req,res){
    const { id } = req.params
    try{
        const ingredientItem = await models.IngredientItem.findOne({
            where: {
                id: id
            }
        })
        res.json({
            data: ingredientItem
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function create(req,res){
    const { ingredient_id, product_id, amount } = req.body
    try {
        let newIngredientItem = await models.IngredientItem.create({
            ingredient_id,
            product_id,
            amount
        })
        if(newIngredientItem){
            res.json({
                message: 'SUCCESS!!',
                data: newIngredientItem
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error
        })
    }
}

export async function updateIngredientItem(req,res){
    const { id } = req.params
    const { ingredient_id, product_id, amount }
    const ingredientItemFound = await models.IngredientItem.findAll({
        attributes: ['ingredient_id','product_id','amount'],
        where:{
            id = id
        }
    })
    if(ingredientItemFound.length > 0){
        ingredientItemFound.forEach(async ingredientItemFound =>{
            await models.IngredientItem.update({
                ingredient_id,
                product_id,
                amount
            },{
                where: {
                    id: id
                }
            })
        })
    }
    return res.json({
        message: 'Ingredient updated successfully'
    })
}

export async function deleteIngredientItem(req,res){
    const { id } = req.params
    try {
        const deleteRowCount = await models.IngredientItem.destroy({
            where:{
                id: id
            }
        })
        res.json({
            message: 'Ingredient deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting IngredientItem'
        })
    }
}