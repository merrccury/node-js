module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Supplier", {
            ID: {type: Sequelize.INTEGER},
            ORGANIZATION: {type: Sequelize.STRING, allowNull: false},
            ADDRESS: {type: Sequelize.STRING, allowNull: false},
            PHONE: {type: Sequelize.STRING, allowNull: false},
            EMAIL: {type: Sequelize.STRING, allowNull: false},
            COOPERATION: {type: Sequelize.BOOLEAN, allowNull: false}
        }, {
            sequelize,
            modelName: 'Supplier',
            tableName: 'SUPPLIER',
            timestamps: false
        }
    );
}