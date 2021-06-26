const {Products} = require("../model/index")

let getAllProduct = async (req, res) => {
    Products.findAll().then(data => res.json(data));
}
let addProduct = async (req, res) => {
    try {
        console.log('addProduct ', req.body);
        req.body.DATE_OF_MANUFACTURE = '2016-08-09 04:05:02';//new Date(req.body.DATE_OF_MANUFACTURE);
        let result = await Products.create(req.body);
        res.json(result);
    } catch (error) {
        res.status(403).json({error});
    }
}
let updateProduct = async (req, res) => {
    try {
        let predicate = {ID: req.body.ID};
        let oldValue = await Products.findAll({where: predicate});
        let count = await v.update(req.body, {where: predicate});
        if (count[0] === 0)
            res.status(409).json({error: `not updated`});
        else
            res.json(oldValue);
    } catch (error) {
        res.status(409).json({error: e});
    }
}
let deleteProduct = async (req, res) => {
    try {
        let predicate = {ID: req.params["ID"]};
        let oldValue = await Products.findAll({where: predicate});
        let count = await Products.destroy({where: predicate});
        console.log(count);
        if (count === 0)
            res.status(409).json({error: `not deleted`});
        else
            res.json(oldValue);
    } catch (error) {
        res.status(409).json({error: e});
    }
}
module.exports = {getAllProduct, addProduct, updateProduct, deleteProduct};
