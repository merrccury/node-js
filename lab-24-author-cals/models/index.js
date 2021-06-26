const {Sequelize, QueryTypes} = require("sequelize");
const sequelize = new Sequelize("lab_24", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});

const Users = require("./users")(Sequelize, sequelize);
const Repos = require("./repos")(Sequelize, sequelize);
const Commits = require("./commits")(Sequelize, sequelize);


module.exports = {Users, Repos, Commits};
