const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db');
const {compareText} = require('../utils/bcrypt')
const repository = require('../repository')

const router = express.Router();

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await repository.user.findOne({ username });

    if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
    

    const isSame = await compareText(password, user.password);

    if (!isSame) return cb(null, false, { message: 'Incorrect username or password.' });

    return cb(null, user);
  
    // db.get('SELECT * FROM users WHERE username = ?', [username], function (err, row) {
    //     if (err) { return cb(err); }
    //     if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    //     crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
    //         if (err) { return cb(err); }
    //         if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
    //             return cb(null, false, { message: 'Incorrect username or password.' });
    //         }
    //         return cb(null, row);
    //     });
    // });
}));

let adminStatement = "";

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

router.get('/admin', function (req, res, next) {
    res.render("admin", { invalidAdmin: adminStatement });
    next();
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/admin'
}));

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

// any other page

router.get("/:page", (req, res) => {
    const requestedPage = req.params.page;
    res.render(requestedPage, { cssEjs: requestedPage });
  });
  

module.exports = router;