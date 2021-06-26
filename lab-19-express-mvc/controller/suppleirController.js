const {Supplier} = require("../model/index")

let getAllSuppliers = async (req, res) => {
    Supplier.findAll().then(data => res.json(data));
}

let addSupplier = async (req, res) => {
    let body = {
        POSITION: req.body.position,
        ORGANIZATION: req.body.organization,
        ADDRESS: req.body.address,
        PHONE: req.body.phone,
        EMAIL: req.body.email,
        COOPERATION: req.body.cooperation
    }
    Supplier.create(body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

let updateSupplier = async (req, res) => {
    let body = {
        POSITION: req.body.position,
        ORGANIZATION: req.body.organization,
        ADDRESS: req.body.address,
        PHONE: req.body.phone,
        EMAIL: req.body.email,
        COOPERATION: req.body.cooperation
    }
    Supplier.update(body, {where: {ID: req.body.id}})
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

let deleteSupplier = async (req, res) => {
    Supplier.destroy({where: {ID: req.body.id}})
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

module.exports = {getAllSuppliers, addSupplier, updateSupplier, deleteSupplier};
