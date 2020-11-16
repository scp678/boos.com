const express = require('express');
const path = require('path');
const usersRouter = require('./router/users');
const productRouter = require('./router/product');
const cookieParser = require('cookie-parser');
const creatError = require('http-errors');

const app = express();

let conf = {
    port: 8088,
    host: '10.31.162.71'
};

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/users',usersRouter);
app.use('/product',productRouter);

app.use(function(req,res,next) {
   next(creatError(404));
});

app.use(function(err,req,res,next) {
    res.status(err.status || 500);
    res.redirect('/html/404.html');
});

app.listen(conf.port,conf.host,() => {
    console.log(`server is running on http://${conf.host}:${conf.port}`);
});