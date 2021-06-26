const {Repos} = require('./index');

module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Repos", {
            id: {type: Sequelize.INTEGER, primaryKey: true},
            repoId: {type: Sequelize.INTEGER, allowNull: false, references: {model: Repos, key: "id"}},
            message: {type: Sequelize.STRING, allowNull: false}
        }, {
            sequelize, modelName: 'Repos', tableName: 'repos', timestamps: false
        }
    );
}