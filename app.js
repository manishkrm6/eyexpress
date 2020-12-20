const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const port = 3000;

// Security Policy
app.use(helmet());

// To Serve Public Files
app.use(express.static('public'));

// Parse json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

// Logout
app.get('/logout', (req, res, next) => {
    res.clearCookie('username');
    res.redirect('/login');
});

app.get('/login', ( req, res, next ) => {
    console.log(req.query);
    const messageIfAny = req.query.message;
    res.render("login",{messageIfAny:messageIfAny});
});

app.get('/welcome', ( req, res, next ) => {
    
    console.log(" Cookie Value "+req.cookies.username);
    res.render("welcome",{username:req.cookies.username});
});

app.post('/process_login', (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;

    if ( password === "helloworld@27"){
        res.cookie('username',username);
        res.redirect('/welcome');
    }
    else{
        res.redirect('/login?status=failed&message=Login Unsuccessful');
    }

});

app.get('/', ( req, res, next ) => {
    res.send("<h1>Express 301 Home Page!");
});

app.listen(port);