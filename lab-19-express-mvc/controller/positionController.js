const {Position} = require("../model/index")

let getAllPositions= async (req, res) => {
    Position.findAll().then(data => res.json(data));
}

let addPosition = async (req, res) => {
    let body = {
        POSITION: req.body.position,
    }
    Position.create(body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

let updatePosition = async (req, res) => {
    let body = {
        POSITION: req.body.position,
    }
    Position.update(body, {where: {ID: req.body.id}})
        .then(data => res.json(data))
        .catch(err => res.json(err));
}

let deletePosition = async (req, res) =>{
    Position.destroy({where:{ID: req.body.id}})
        .then(data => res.json(data))
        .catch(err=> res.json(err));
}

module.exports = {getAllPositions, addPosition, updatePosition, deletePosition};
