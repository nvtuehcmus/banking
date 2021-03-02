const express = require('express');
const cookieSession = require( 'cookie-session');      
const dotenv = require( 'dotenv');
const lscus = require('./router/admin/listCustomer');  
const bodyParser = require('body-parser');
const activeCus = require('./router/admin/activeCif'); 
const login = require('./router/login');
const register = require('./router/register');
const home = require('./router/customer/home');   
const path = require('path')     


const asyncHandler = require('express-async-handler'); //try catch asyn function

dotenv.config(); // set environment variables

const app = express()
process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'public')));
// app.use(express.static('public'));

app.use(cookieSession({
    name: 'session',
    keys:['1234'],
    maxAge: 60*60*10000, //a hour
}));

app.set('views','./views');
app.set('view engine','ejs');

app.use('/',bodyParser.urlencoded({ extended: false }),login);
app.use('/home',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),home);
app.use('/register',bodyParser.urlencoded({ extended: false }),register);

 app.use('/list-customer',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),lscus);
 app.use('/active-customer',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),activeCus);
 app.use('/payment',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/admin/payment'));
 app.use('/active-customer',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),activeCus);
 app.use('/paymentSpend',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/admin/paymentSpend'));


app.use('/profile',bodyParser.json(), asyncHandler(require('./middlewares/auth')),require('./router/customer/profile'));
app.use('/verify',bodyParser.urlencoded({ extended: false }),require('./router/customer/verify'));
app.use('/send',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/customer/sendMoney'));
app.use('/sendTK',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/customer/sendTk'));
app.use('/saving',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/customer/saving'));
app.use('/spend',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/customer/spend'));
app.use('/balance',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/customer/balance'));
app.use('/inform',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/customer/notification'));
app.use('/logout',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/logout'));

app.use('/admin',bodyParser.urlencoded({ extended: false }),require('./router/admin/admin'));
// //api

// app.use('/card',bodyParser.urlencoded({ extended: false }), asyncHandler(require('./middlewares/auth')),require('./router/card'));

// app.use('/api/customer/spendcard',bodyParser.json(), asyncHandler(require('./middlewares/auth')),require('./api/v1/spend_infor'));
// app.use('/search',bodyParser.urlencoded({ extended: false }),require('./router/search'));



app.listen(process.env.PORT,
    console.log(`app listen on ${process.env.PORT}`)
);
