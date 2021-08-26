const model = require('../models/index')
import sequelize from 'sequelize'

export async function getIngredients(res){
    try {
        const ingredients = await model.Ingredients.findAll()
        res.json({ 
            data: ingredients
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error,
            data: {}
        })
    }
}

export async function getOneIngredient(req,res){
    const { id } = req.params
    try {
        const ingredient = await model.Ingredients.findOne({
            where:{
                id = id
            }
        })
        res.json({
            data: ingredient
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong' + error
        })
    }
}

export async function create(req,res){
    const { ingredient_name, price } = req.body
    try {
        let newIngredient = await models.ingredient.create({
            ingredient_name,
            price
        })
        if(newIngredient){
            res.json({
                message: 'SUCCESS',
                data: newIngredient
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong '+ error,
            data: {}
        })
    }
}

export async function updateIngredient(req,res){
    const { id } = req.params
    const { ingredient_name, price } = req.body
    
    const ingredientFound = await models.Ingredient.findAll({
        attributes: ['ingredient_name','price'],
        where:{
            id: id
        }
    })
    if(ingredientFound.length > 0){
        ingredientFound.forEach(async ingredientFound => {
            await models.Ingredient.update({
                ingredient_name,
                price
            })
        },{
            where: {
                id: id
            }
        })
    }
    return res.json({
        message: 'Ingredient updated succesfully'
    })  
}

export async function deleteIngredient(req, res){
    const { id } = req.params
    try {
        const deleteRowCount = models.Ingredient.destroy({
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
            message: 'Error deleting the ingredient'
        })
    }   
}