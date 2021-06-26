const fs = require("fs");

let writeEnd=(res, code, data)=>{
    res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" });
    res.end(data);
}

let writeHtml=(res)=>{
    let file = new fs.ReadStream('./static/index.html')
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    file.pipe(res);
}

let write404 = (res)=>{
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
        error: "Page noe found",
        code: 404
    }));
}

const getHandler = (req, res) => {
    console.log(req.path);
    if(req.path === '/')
        writeHtml(res);
    writeHtml(res);
}

exports.get = getHandler;