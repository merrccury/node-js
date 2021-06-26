const Sequelize = require("sequelize");

const sequelize = new Sequelize('store', 'student', 'fitfit',
    {
        host: "DESKTOP-V8HU7V3",
        dialect: "mssql"
    });

module.exports = {
    Categories: require("./categories")(Sequelize, sequelize),
    Products: require("./products")(Sequelize, sequelize),
    Position: require("./position")(Sequelize, sequelize),
    Employees: require("./employees")(Sequelize, sequelize),
    Supplier: require("./supplier")(Sequelize, sequelize),
    sequelize,
    Sequelize,
}
