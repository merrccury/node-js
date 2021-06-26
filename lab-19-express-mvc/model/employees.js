module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Employees", {
            ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            FIRST_NAME: {type: Sequelize.STRING, allowNull: false},
            LAST_NAME: {type: Sequelize.STRING, allowNull: false},
            DATE_OF_EMPLOYMENT: {type: Sequelize.DATE, allowNull: false},
            DATE_OF_EXIT: {type: Sequelize.DATE, allowNull: false},

        }, {
            sequelize,
            modelName: 'Employees',
            tableName: 'EMPLOYEES',
            timestamps: false
        }
    );
}