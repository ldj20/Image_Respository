//imports
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const cors = require('cors');

const userRouter = require("./backend/users/user.router");
const imgRouter = require("./backend/images/image.router");

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));

//set cors
// const whitelist = ['https://image-storing.netlify.app', 'http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200
// }
var corsOptions = {
    origin: ['https://image-storing.netlify.app', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//security settings
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge : 7200000 }
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