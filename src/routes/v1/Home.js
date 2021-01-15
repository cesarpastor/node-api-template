const express = require('express');
const router = express.Router();
//const jwtService = require('../../service/jwtService')



router.get('/', function (req, res) {
  res.send("Welcome to my node api project template. changes has been made");
});


router.get('/secured', function(req, res) {
    res.send('This is secured endpoint');
});

/*
router.post('/secured', jwtService.isBearerAuthenticated , function(req, res){
    res.send('This is secured endpoint');
})
*/


module.exports = router;