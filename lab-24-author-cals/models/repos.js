const {Users} = require('./index');

module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Repos", {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            name: {type: Sequelize.STRING, allowNull: true},
            authorId: {type: Sequelize.INTEGER, allowNull: false, references: {model: Users, key: "id"}}
        }, {
            sequelize, modelName: 'Repos', tableName: 'repos', timestamps: false
        }
    );
}