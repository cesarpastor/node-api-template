const express = require('express');
var app = express();


const router = express.Router();
const homeRoute = require('./v1/Home');
const authRoute = require('./v1/Authentication')


router.use('/', homeRoute);
router.use('/home', homeRoute);
router.use('/auth', authRoute);

module.exports = router;