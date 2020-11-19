const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const socket = require('socket.io');
// const session = require('express-session');
const bodyParser = require('body-parser')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const db = require('./model/db')
const app = express();

//use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*  Google AUTH  */

const GOOGLE_CLIENT_ID =
  "208922727243-chcjrc4uu520omqom1csgobhagoli40i.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "clU0mrAKbXhmzPl2ONsu1S3q";

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Successful authentication, redirect success.
    console.log("Callback ---------------------------- ==> ", req.user)
    req.session.profile = req.user;
    res.redirect("/homeSender");
  }
);

//ดึง controller มาใช้
const homeSenderRouter = require("./routes/homeSenderController");

//กำหนดตัวแปรให้ controller
app.use("/homeSender",isLoggedIn, homeSenderRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('500error');
});


//funtion middleware login
function isLoggedIn(req, res, next) {

  if (req.session.profile && req.cookies.user_sid) {
      next();
  } else {
      console.log('isNotLoggin')
      res.redirect("/");
  }
};

/* login */

app.get("/", function(req, res) {
  res.render("login");
});

let userProfile;

app.get("/profile", (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.user);
  res.render("profile", { user: req.user });

});
app.get("/error", (req, res) => res.send("error logging in"));





passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"

  },
  function(accessToken, refreshToken, profile, done) {
      userProfile = profile;

      return done(null, userProfile);
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
  }
));


//



// route for logging out
app.get("/logout", function(req, res) {
  req.session.destroy(function(err) {
      userProfile = null;
      req.logout();
      res.redirect("/");
  });
});

module.exports = app;
