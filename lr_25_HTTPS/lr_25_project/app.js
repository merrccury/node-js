const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000

/*let options =
{
    key: fs.readFileSync('./security_lk/RS-LAB25-HDV.key'),
    cert: fs.readFileSync('./security_lk/RS-HDV-CRT.crt')
};*/

let options =
{
    key: fs.readFileSync('./security_other_way/cert.key'),
    cert: fs.readFileSync('./security_other_way/cert.pem')
};

app.get('/', (req, res) =>
{
    res.send("hello from https")
})

https.createServer(options, app).listen(port, () =>
{
    console.log(`https://localhost:${port}/`);
});