const router = require('express').Router();
const crypto = require('crypto');
const session = require('express-session');
const authMiddleware = require('./auth-controller');
const saltMiddleware = require('../middlewares/salt');

const sessionObj = {
    secret: process.env.SESSION_ID,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 5
};

router.use(session(sessionObj));
router.use(saltMiddleware);

router.get('/check-login', authMiddleware.checkLoginGetMid);
router.get('/user', authMiddleware.userGetMid);
router.get('/user/:id', authMiddleware.userIndexGetMid);
router.post('/user', authMiddleware.userPostMid);
router.post('/login', authMiddleware.loginPostMid);

module.exports = router;