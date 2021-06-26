const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000

let options =
{
    key: fs.readFileSync('./security_other_way/merrc.key'),
    cert: fs.readFileSync('./security_other_way/merrc.crt')
};

app.get('/', (req, res) =>
{
    res.send("hello from https")
})

https.createServer(options, app).listen(port, () =>
{
    console.log(`https://127.0.0.1:${port}/`);
});