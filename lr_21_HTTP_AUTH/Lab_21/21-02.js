const app = require('express')();
const passport = require('passport');
const Digest = require('passport-http').DigestStrategy;
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

passport.use(new Digest({qop:'auth'},(user, done) =>
{
  var check = null;
  var credential = Credential(user);
  if(!credential)
  {
    console.log('Wrong user name');
    check = done(null, false);
  }
  else
  {
    check = done(null, credential.user, credential.password);
  }
  return check;
}, (params, done)=>
{
  console.log(`Params: ${JSON.stringify(params)}`);
  done(null, true);
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
}, passport.authenticate('digest', {session: false}), (req, res, next) =>
{
  if (req.session.logout == undefined)
  {
    req.session.logout = false;
  }
  next();
})

app.get('/login', (req, res, next) =>
{
  res.end('Hello world');
})

app.get('/logout', (req, res) =>
{
  console.log('Logout');
  req.session.logout = true;
  delete req.headers['authorization'];
  res.redirect('/login');
})

app.get('/resource', (req, res) =>
{
  console.log('Resource');
  if(req.session.logout == false && req.headers['authorization']){
    res.set({ 'content-type': 'text/html; charset=utf-8' });
    res.end('<h1>Это IT буллинг</h1>');
  }
  else
    res.redirect('/login')
});

var Credential = (user) =>
{
  let us = Users.find(u => u.user.toLowerCase() == user.toLowerCase());
  return us;
};

app.listen(3000).on('error', (e) => {console.log(`Listener | error: ${e.code}`)});