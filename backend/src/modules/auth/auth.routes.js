const router = require('express').Router();
const ctrl = require('./auth.controller');
const { validate } = require('../../middleware/validate');

router.post('/register', validate(['name','email','password']), ctrl.register);
router.post('/login', validate(['email','password']), ctrl.login);

module.exports = router;