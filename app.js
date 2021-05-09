//imports
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');

const User = require('./backend/users/user.model');
const userRouter = require("./backend/users/user.router");
const imgRouter = require("./backend/images/image.router");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));

//set cors
var corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//security settings
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge : 50000 }
}));
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./backend/passportConfig')(passport);

/*passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());*/

//routes
app.use("/api/users", userRouter);
app.use("/api/images", imgRouter);

module.exports = app