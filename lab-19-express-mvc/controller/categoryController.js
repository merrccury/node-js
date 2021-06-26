const {Categories} = require("../model/index")

let getAllCategories = async (req, res) => {
    Categories.findAll().then(data => res.json(data));
}

let addCategory = async (req, res) => {
    let body = {
        CATEGORY: req.body.category,
        PARENT_CATEGORY: req.body.parentCategory
    }
    Categories.create(body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

let updateCategory = async (req, res) => {
    let body = {
        CATEGORY: req.body.category,
        PARENT_CATEGORY: req.body.parentCategory
    }
    Categories.update(body, {where: {ID: req.body.id}})
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

let deleteCategory = async (req, res) =>{
    Categories.destroy({where:{ID: req.body.id}})
        .then(data => res.json(data))
        .catch(err=> res.json(err));
}

module.exports = {getAllCategories, addCategory, updateCategory, deleteCategory};
