module.exports = (Sequelize, sequelize) => {
    return sequelize.define("Position",{
            ID: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
            POSITION: {type: Sequelize.STRING, allowNull: false}
        }, {
            sequelize,
            modelName: 'Position',
            tableName: 'POSITION',
            timestamps: false
        }
    );
}