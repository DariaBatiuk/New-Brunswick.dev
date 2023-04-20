const router = require('express').Router();
const passport = require('passport');



router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', {failureRedirect: '/login' }),
    (req, res) => {
        res.redirect("http://localhost:3000/");
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/");
});

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'user has successfully authenticated',
            user: req.user,
            cookies: req.cookies,
        });
    }
});


module.exports = router;