const app = require('express')();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session')({resave: false, saveUninitialized: false, secret: '12345678'});

passport.use(new GoogleStrategy({
    clientID: '964414711116-ka51ajk5pct2m317iardgrqa0b84npme.apps.googleusercontent.com',
    clientSecret: 'l18shRfPi4KzIzpMsEbu4Uqy',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, (token, refreshToken, profile, done) => done(null, {profile: profile, token: token})));

passport.serializeUser((user, done) =>
{
   console.log('serialize: displayName', user.profile.displayName);
   done(null, user);
});
passport.deserializeUser((user, done) =>
{
    console.log('deserialize: displayName', user.profile.displayName);
    done(null, user);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) =>
{
    res.sendFile(__dirname + '/login.html');
});

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) =>
{
    res.redirect('/resource')
});

app.get('/resource', (req, res) =>
{
   if (req.user)
   {
       res.status(200).send(`Resource: ${req.user.profile.id}, ${req.user.profile.displayName}`);
   }
   else
   {
       res.redirect('/login');
   }
});

app.get('/logout', (req, res) =>
{
    req.logout();
    res.redirect('/login');
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000/'));