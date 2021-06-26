const app = require('express')();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const redisClient = redis.createClient('//redis-18666.c240.us-east-1-3.ec2.cloud.redislabs.com:18666', {password:'dXC8KnbhCDRM2VRccPvV1ur2Sy0FOTu9'});

const sequelize = new Sequelize
(
    {
        username: 'student',
        password: 'fitfit',
        database: 'ADV',
        host:     'localhost',
        dialect:  'mssql',
        pool:
            {
                max: 10,
                min: 0,
                idle: 10000
            }
    }
);

const Model = Sequelize.Model;
class Users extends Model{}
Users.init (
    {
        id:	{type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
        login:{type: Sequelize.STRING, allowNull:false},
        password:	{type: Sequelize.STRING, allowNull:false}
    },
    {
        sequelize,
        Users:'Users',
        tableName:'Users',
        timestamps: false
    }
);

const accessKey = 'access_key';
const refreshKey = 'refresh_key';
var oldRefreshKeyCount = 0;

app.use(cookieParser('cookie_key'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) =>
{
    console.log("jwt verifying");
    if (req.cookies.accessToken)
    {
        jwt.verify(req.cookies.accessToken, accessKey, (err, payload) =>
        {
            if (err)
            {
                next();
            }
            else if(payload)
            {
                req.payload = payload;
                next();
            }
        });
    }
    else next();
});

app.get('/login', (req, res) =>
{
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) =>
{
   const candidate = await Users.findOne(
    {
       where:
       {
           login: req.body.username,
           password: req.body.password
       }
   });
   if (candidate)
   {
       const accessToken = jwt.sign({id: candidate.id, login: candidate.login}, accessKey, {expiresIn: 10 * 60});
       const refreshToken = jwt.sign({id: candidate.id, login: candidate.login}, refreshKey, {expiresIn: 24 * 60 * 60});
       res.cookie('accessToken', accessToken, {
           httpOnly: true,
           sameSite: 'strict'
       });
       res.cookie('refreshToken', refreshToken,
{
           httpOnly: true,
           sameSite: 'strict'
       });
       res.redirect('/resource');
   }
   else
   {
       res.redirect('/login');
   }
});

app.get('/refresh-token', (req, res) =>
{
    if (req.cookies.refreshToken)
    {
        jwt.verify(req.cookies.refreshToken, refreshKey,async (err, payload) =>
        {
            if (err) console.log(err.message);
            else if(payload)
            {
                redisClient.on('ready', () => console.log('ready'));
                redisClient.on('error', (err) => console.log(`error: ${err}`));
                redisClient.on('connect', () => console.log('connect'));
                redisClient.on('end', () => console.log('end'));
                redisClient.set(oldRefreshKeyCount, req.cookies.refreshToken, () => console.log('set old refresh token'));
                redisClient.get(oldRefreshKeyCount, (err, result) => console.log('added old refresh token:', result));
                oldRefreshKeyCount++;
                redisClient.quit();

                const candidate = await Users.findOne( { where: { id: payload.id } });
                const newAccessToken = jwt.sign({id: candidate.id, login: candidate.login}, accessKey, {expiresIn: 10 * 60});
                const newRefreshToken = jwt.sign({id: candidate.id, login: candidate.login}, refreshKey, {expiresIn: 24 * 60 * 60});
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    sameSite: 'strict'
                });
                res.cookie('refreshToken', newRefreshToken, {
                    path: '/refresh-token'
                });
                res.redirect('/resource');
            }
        });
    }
    else res.status(401).send('Please, authorize');
});

app.get('/resource', (req, res) =>
{
    if (req.payload) res.status(200).send(`Resource ${req.payload.id}-${req.payload.login}`);
    else res.status(401).send('Non authorized');
});

app.get('/logout', (req, res) =>
{
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

sequelize.sync().then(() =>
{
    app.listen(3000, () => console.log('Server is running on http://localhost:3000/"'));
})
.catch(error => console.log(error));