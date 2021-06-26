const http = require("http");
const fs = require("fs");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('ADV', 'student_fit', 'fitfit', {host: "localhost", dialect: "mssql", force:true});
const {Faculty, Pulpit, Teacher, Subject, AuditoriumType, Auditorium} = require("./models").ORM(sequelize);

sequelize.authenticate().then(() => console.log("done")).catch(err => console.log(err));
sequelize.sync({force: true}).then(() => console.log("async done")).catch(err => console.log(err));

http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            getHandler(req, res);
            break;
        case "POST":
            postHeader(req, res);
            break;
        case "PUT":
            putHeader(req, res);
            break;
        case "DELETE":
            delHeader(req, res);
            break;
        default:
            other_handler(req, res);
            break;
    }
}).listen(18018, () => console.log("http://localhost:18018"));


let writeEnd = (res, code, data) => {
    res.writeHead(code, {"Content-Type": "application/json; charset=utf-8"});
    res.end(data);
}
let writeHtml = (res) => {
    let file = new fs.ReadStream('./static/index.html')
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    file.pipe(res);
}
let write404 = (res) => {
    res.writeHead(404, {"Content-Type": "application/json; charset=utf-8"});
    res.end(JSON.stringify({
        error: "Page noe found",
        code: 404
    }));
}

const getHandler = async (req, res) => {
    console.log(req.url);
    if (req.url === '/')
        writeHtml(res);
    else if (req.url === '/api/auditoriumsgt60') {
        let gan = await Auditorium.scope('auditoriumsgt60').findAll();
        writeEnd(res, 200, JSON.stringify(gan));
    } else if (req.url === '/api/transaction') {
        const t = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED});
        try {
            let res = await sequelize.query("UPDATE AUDITORIUM SET AUDITORIUM_CAPACITY = AUDITORIUM_CAPACITY + 10",{transaction:t});
            // await t.commit();
            //await t.rollback();
            setTimeout(()=> t.rollback(),10000);
            writeEnd(res, 200, JSON.stringify(res));

        } catch (error) {
            writeEnd(res, 418, JSON.stringify(error));
        }
    } else {
        let parms = decodeURI(req.url).split("/");
        console.log(parms);
        if (parms.length === 3) {
            switch (parms[2]) {
                case "faculties": {
                    writeEnd(res, 200, await Faculty.findAll().then(set => JSON.stringify(set)));
                    break;
                }
                case "pulpits": {
                    writeEnd(res, 200, await Pulpit.findAll().then(set => JSON.stringify(set)));
                    break;
                }
                case "subjects": {
                    writeEnd(res, 200, await Subject.findAll().then(set => JSON.stringify(set)));
                    break;
                }
                case "auditoriumstypes": {
                    writeEnd(res, 200, await AuditoriumType.findAll().then(set => JSON.stringify(set)));
                    break;
                }
                case "auditoriums": {
                    writeEnd(res, 200, await Auditorium.findAll().then(set => JSON.stringify(set)));
                    break;
                }
                default: {
                    write404(res);
                }
            }
        } else if (parms.length === 5)
            if (parms[4] === "pulpits")
                writeEnd(res, 200, await Faculty.findAll({
                    where: {faculty: parms[3]},
                    include: [
                        {model: Pulpit, as: "faculty_pulpits", required: false}
                    ]
                }).then(set => JSON.stringify(set)));
            else if (parms[4] === "teachers")
                writeEnd(res, 200, await Faculty.findAll({
                    where: {faculty: parms[3]},

                    include: [
                        {
                            model: Pulpit, as: "faculty_pulpits", required: false,
                            include: [
                                {model: Teacher, as: "pulpit_teachers", required: false}
                            ]
                        }
                    ]
                }).then(set => JSON.stringify(set))); else write404(res);
        else {
            write404(res);
        }
    }
}

const postHeader = async (req, res) => {
    let body = "";
    await req.on("data", data => body += data);
    await req.on("end", () => console.log(body));
    body = JSON.parse(body);
    let parms = decodeURI(req.url).split("/");
    console.log(parms);
    if (parms.length !== 3)
        write404(res);
    else {
        console.log(JSON.stringify(body));
        switch (parms[2]) {
            case "faculties": {
                await Faculty.create(body)
                    .then(task => writeEnd(res, 200, JSON.stringify(task)))
                    .catch(err => writeEnd(res, 403, JSON.stringify(err)));
                break;
            }
            case "pulpits": {
                await Pulpit.create(body)
                    .then(task => writeEnd(res, 200, JSON.stringify(task)))
                    .catch(err => writeEnd(res, 403, JSON.stringify(err)));
                break;
            }
            case "subjects": {
                await Subject.create(body)
                    .then(task => writeEnd(res, 200, JSON.stringify(task)))
                    .catch(err => writeEnd(res, 403, JSON.stringify(err)));
                break;
            }
            case "auditoriumstypes": {
                await AuditoriumType.create(body)
                    .then(task => writeEnd(res, 200, JSON.stringify(task)))
                    .catch(err => writeEnd(res, 403, JSON.stringify(err)));
                break;
            }
            case "auditoriums": {
                await Auditorium.create(body)
                    .then(task => writeEnd(res, 200, JSON.stringify(task)))
                    .catch(err => writeEnd(res, 403, JSON.stringify(err)));
                break;
            }
            default: {
                write404(res);
            }
        }
    }


}

const putHeader = async (req, res) => {
    let body = "";
    await req.on("data", data => body += data);
    await req.on("end", () => console.log(body));
    body = JSON.parse(body);
    let parms = decodeURI(req.url).split("/");
    console.log(parms);
    if (parms.length !== 3)
        write404(res);
    else {
        console.log(JSON.stringify(body));
        switch (parms[2]) {
            case "faculties": {
                let oldValue = await Faculty.findAll({where: {FACULTY: body.FACULTY}});
                let count = await Faculty.update(body, {where: {FACULTY: body.FACULTY}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count[0] === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Faculty "${body.FACULTY}" not updated`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "pulpits": {
                let oldValue = await Pulpit.findAll({where: {PULPIT: body.PULPIT}});
                let count = await Pulpit.update(body, {where: {PULPIT: body.PULPIT}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count[0] === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Pulpit "${body.PULPIT}" not updated`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "subjects": {
                let oldValue = await Subject.findAll({where: {SUBJECT: body.SUBJECT}});
                let count = await Subject.update(body, {where: {SUBJECT: body.SUBJECT}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count[0] === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Subjetc "${body.SUBJECT}" not updated`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "auditoriumstypes": {
                let oldValue = await AuditoriumType.findAll({where: {AUDITORIUM_TYPE: body.AUDITORIUM_TYPE}});
                let count = await AuditoriumType.update(body, {where: {AUDITORIUM_TYPE: body.AUDITORIUM_TYPE}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count[0] === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Auditorium type "${body.AUDITORIUM_TYPE}" not updated`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "auditoriums": {
                let oldValue = await Auditorium.findAll({where: {AUDITORIUM: body.AUDITORIUM}});
                let count = await Auditorium.update(body, {where: {AUDITORIUM: body.AUDITORIUM}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count[0] === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Auditorium "${body.AUDITORIUM}" not updated`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            default: {
                write404(res);
            }
        }
    }


}

const delHeader = async (req, res) => {
    let parms = decodeURI(req.url).split("/");
    console.log(parms);
    if (parms.length !== 4)
        write404(res);
    else {
        switch (parms[2]) {
            case "faculties": {
                let oldValue = await Faculty.findAll({where: {FACULTY: parms[3]}});
                let count = await Faculty.destroy({where: {FACULTY: parms[3]}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                console.log(count);
                if (count === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Faculty "${parms[3]}" not deleted`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "pulpits": {
                let oldValue = await Pulpit.findAll({where: {PULPIT: parms[3]}});
                let count = await Pulpit.destroy({where: {PULPIT: parms[3]}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Pulpit "${parms[3]}" not deleted`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "subjects": {
                let oldValue = await Subject.findAll({where: {SUBJECT: parms[3]}});
                let count = await Subject.destroy({where: {SUBJECT: parms[3]}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Subject "${parms[3]}" not deleted`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "auditoriumtypes": {
                let oldValue = await AuditoriumType.findAll({where: {AUDITORIUM_TYPE: parms[3]}});
                let count = await AuditoriumType.destroy({where: {AUDITORIUM_TYPE: parms[3]}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Auditorium Type "${parms[3]}" not deleted`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            case "auditoriums": {
                let oldValue = await Auditorium.findAll({where: {AUDITORIUM: parms[3]}});
                let count = await Auditorium.destroy({where: {AUDITORIUM: parms[3]}})
                    .catch(err => writeEnd(res, 409, JSON.stringify(err)));
                if (count === 0)
                    writeEnd(res, 409, JSON.stringify({error: `Auditorium "${parms[3]}" not deleted`}));
                else
                    writeEnd(res, 200, JSON.stringify(oldValue));
                break;
            }
            default: {
                write404(res);
            }
        }
    }


}
