const jsonWebToken = require("jsonwebtoken");
const appConfig = require("../../config/AppConfig");
const jwtBuilder = require("jwt-builder");
const encryptionService = require('./EncryptionService');
const base64 = require('base64url');

exports.isBearerAuthenticated = function isBearerAuthenticated(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["Authorization"].split(" ")[1];
  if (token) {
    jsonWebToken.verify(token, appConfig.jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token.",
        });
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided.",
    });
  }
};

exports.createJwtToken = function createJwtToken(id, issuer, subject) {
  
  const encSubject = encryptionService.encrypt(subject);
  const token = jwtBuilder({
    algorithm: "HS256",
    secret: appConfig.jwtSecret,
    nbf: true,
    exp: 3600,
    iss: issuer,
    userId: id,
    subject: encSubject,
  });
  return token;
};


exports.extractUserFromJWT = function extractUserFromJWT(token){
  const jwtParts = token.split('.');
  /**
   * jwtPart 0 = header, 1 = payload, 2 = signature
   */
  const decodedPayload = base64.decode(jwtParts[1]);
  const jsonPayload = JSON.parse(decodedPayload);
  const userInfo = JSON.parse(encryptionService.decrypt(jsonPayload.subject))
  return userInfo;
};