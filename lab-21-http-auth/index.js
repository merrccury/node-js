// const express = require("express")
// const passport = require("passport")
// const BasicStrategy = require('passport-http').BasicStrategy;
// const credentials = require("./credentials.json").credentials;
// const sessions = require("express-session")
//
// console.log(credentials);
//
// const app = express();
//
// app.get("/login", (req , res)=>{
//
// })
//
// app.get("/logout", (req , res)=>{
//
// })
//
// app.get("/resource", (req , res)=>{
//     res.sendFile(__dirname + "/resource/img.png");
// })
//
// app.use((req, res) => {
//     res.status(404).send("Resource not found");
// });
//
// app.listen(21021, ()=>console.log("http://localhost:21021/resource"));

const app = require('express')();
const passport = require('passport');
const Basic = require('passport-http').BasicStrategy;
const session = require('express-session')(
    {
        resave: false,
        saveUninitialized: false,
        secret: '123'
    });

var Users = require(__dirname + '/users.json');

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Basic((user, pass, done)=>
{
    var check = null;
    var credential = Credential(user);
    if(!credential)
    {
        console.log('Wrong user name');
        check = done(null, false, {message: 'Wrong user name'});
    }
    else if(!verificate(credential.password, pass))
    {
        console.log('Wrong user password');
        check = done(null, false, {message: 'Wrong user password'});
    }
    else
    {
        check = done(null, user, {message: 'All ok'});
    }
    return check;
}));

passport.serializeUser((user, done)=>
{
    console.log('SerializeUser');
    done(null, user);
});

passport.deserializeUser((user, done)=>
{
    console.log('DeserializeUser');
    done(null, user);
});

app.get('/login', (req, res, next)=>
{
    console.log('Login')
    if (req.session.logout && req.headers['authorization'])
    {
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
}, passport.authenticate('basic'), (req, res, next)=>
{
    if (req.session.logout == undefined)
    {
        req.session.logout = false;
    }
    next();
});

app.get('/login', (req, res, next)=>
{
    res.end('Hello world');
});

app.get('/logout', (req, res)=>
{
    console.log('Logout');
    req.session.logout = true;
    delete req.headers['authorization'];
    res.redirect('/login');
})

app.get('/resource', (req, res)=>
{
    console.log('Resource');
    if(req.session.logout == false && req.headers['authorization'])
        res.end('Resource');
    else
        res.redirect('/login')
});

var Credential = (user) =>
{
    var us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
    return us;
};

var verificate = (pass1, pass2) =>
{
    return pass1 == pass2;
};

app.listen(3000).on('error', (e) =>
{
    console.log(`Listener | error: ${e.code}`)
});
