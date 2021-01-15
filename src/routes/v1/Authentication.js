const express = require('express');
const router = express.Router();
const authenticationController = require('../../controller/AuthenticationController');
const authenticationService = require('../../service/AuthenticationService');


router.post('/login',authenticationService.handleLoginValidation, authenticationController.handleSignIn);

router.get('/dec', authenticationController.handleDecryption);

router.get('/auth-header', authenticationController.handleTokenBearer);

module.exports = router;