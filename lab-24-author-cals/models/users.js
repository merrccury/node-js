module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Users", {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            username: {type: Sequelize.STRING, allowNull: false},
            email: {type: Sequelize.STRING, allowNull: false},
            password: {type: Sequelize.STRING, allowNull: false},
            role: {type: Sequelize.STRING, allowNull: false}
        }, {
            sequelize, modelName: 'Users', tableName: 'users', timestamps: false
        }
    );
}