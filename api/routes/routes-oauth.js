const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const User = require('../models/User');
const router = express.Router();

passport.use(new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/api/oauth/redirect/google',
        scope: ['profile', 'email']
    }, 
    async function verify (issuer, profile, next) {
        // console.log(`Profile ${JSON.stringify(profile)}`);
        let email;
        if (profile.emails && profile.emails.length > 0){
            email = profile.emails[0].value;
        }
        const user = await User.findOne({email: email});
        console.log(`User ${user}`);
        if (!user){
            const newAutore = new User({
                nome: profile.name.givenName, 
                cognome: profile.name.familyName,
                verified: true,
                issuer: issuer,
                email
            }); 
            newAutore.save();
            next(null, newAutore);
        } else {
            // esiste già
            if (issuer.includes('accounts.google.com')) {
                console.log('Issuer ',issuer);
                next(null, user);
            }else{
                next(null, false);
            }
                
        }
    })
);
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, name: user.name });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

router.get('/api/oauth/google', passport.authenticate('google'));
router.get('/api/oauth/redirect/google', 
    passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
        // console.log('Res *****************', res);
        const user = req.user;
        console.log('User mail ', user.email);
        const token = jwt.sign({ id: user._id, 
            nome: user.nome, 
            cognome: user.cognome,
            email: user.email,
            isAdmin: user.isAdmin,
        }, jwt_secret);
        res.status(200).redirect(`/validateToken/${token}`);
});


module.exports = router;