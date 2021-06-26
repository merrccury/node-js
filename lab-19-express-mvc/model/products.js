const {Categories} = require('./index')

module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Products", {
            ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            NAME: {type: Sequelize.STRING, allowNull: false},
            DESCRIPTION: {type: Sequelize.STRING, allowNull: false},
            DATE_OF_MANUFACTURE: {type: Sequelize.DATE, allowNull: false},
            STATUS: {type: Sequelize.BOOLEAN, allowNull: false},
            AVAILABLE: {type: Sequelize.INTEGER, allowNull: false},
            IN_STOCK: {type: Sequelize.INTEGER, allowNull: false},
            CATEGORY_ID: {type: Sequelize.INTEGER, allowNull: false, references: {model: Categories, key: "ID"}},
            PRICE: {type: Sequelize.DOUBLE, allowNull: false}
        }, {
            sequelize,
            modelName: 'Products',
            tableName: 'PRODUCTS',
            timestamps: false
        }
    );
}