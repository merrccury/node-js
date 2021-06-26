const Sequelize = require("sequelize");
const sequelize = new Sequelize('store', 'student_fit', 'fitfit', {host: "localhost", dialect: "mssql"});
const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');


sequelize.authenticate().then(() => console.log("done")).catch(err => console.log(err));
//sequelize.sync({force: true}).then(() => console.log("sync done")).catch(err => console.log(err));

const categoriesRouter = require("./routers/categoryRouter")
const positionRouter = require("./routers/positionRouter")
//const supplierPosition = require("./routers/supplierRouter")

app.use(bodyParser.json());

app.use('/categories', categoriesRouter);
app.use('/position', positionRouter);
//app.use('/supplier', supplierPosition);


http.listen(19106, () => {
    console.log('http://localhost:19106/');
});