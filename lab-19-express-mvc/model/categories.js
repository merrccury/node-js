module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Categories", {
            ID: {type: Sequelize.INTEGER},
            CATEGORY: {type: Sequelize.STRING, allowNull: false},
            PARENT_CATEGORY: {type: Sequelize.INTEGER, allowNull: false, references: {model: this, key: "ID"}}
        }, {
            sequelize,
            modelName: 'Categories',
            tableName: 'CATEGORIES',
            timestamps: false
        }
    );
}