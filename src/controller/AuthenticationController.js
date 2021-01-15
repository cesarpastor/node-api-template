
const appConfig = require('../../config/AppConfig');
const jwtService = require('../service/JwtService')
const encryptionService = require('./../service/EncryptionService')
const base64 = require('base64url');



/**
 * Dummy users
 */
const users = [
    {username : 'loybu', password: 'password123', role : 'USER'},
    {username : 'buloy', password: 'password123', role : 'ADMIN'},
    {username : 'admin', password: 'password123', role : 'ADMIN'},
    {username : 'user', password: 'password123', role : 'USER'}
];



module.exports = {

    handleSignIn: (req, res) => {
        const userName = req.body.username;
        const password = req.body.password;
        const user = users.filter(user => user.username == userName && user.password == password);
        if(user.length > 0){
            const token = jwtService.createJwtToken(user.username, appConfig.jwtIssuer, JSON.stringify(user));
            return res.status(200).json({ data: { token: token } });

        } else {
            return res.status(401).json({
                message: 'Invalid credential',
              });
        }
        
    },

    handleDecryption: (req, res) => {
        const enc = req.query.enc;
        const dec = encryptionService.decrypt(enc);
        return res.status(200).json(JSON.parse(dec));
    },

    handleTokenBearer: (req, res) =>{
        console.log(req.userInfo);
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token != null){            
            const result = {
                token : token,
                decoded : jwtService.extractUserFromJWT(token)
            }
            return res.status(200).send(result);
        }else{
            return res.status(401).send("no authorization header found");
        }
        

    },

};