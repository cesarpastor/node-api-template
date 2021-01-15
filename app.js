const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const jwtService = require('./src/service/JwtService');

const routeV1 = require('./src/routes/Index');

const app = express();

// *** cross domain requests *** //
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    next();
  });



app.use((req, res, next) => {
    const url = req.url;
    if(!canPass(url)){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null){
            return res.status(401).json({
                message: 'Authorization token required',
              });
        }else {
          const userInfo = jwtService.extractUserFromJWT(token);
          req.userInfo = userInfo;
        }
    }
    next();
});

function canPass(url){
  if(url.startsWith('/api/v1/auth/login')){
    return true;
  }else{
    return false;
  }
}



app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // required for Express-Validator

app.use('/api/v1', routeV1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
app.use((err, req, res, next) => {
    if (!err) return next();
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    return res.status(err.status || 500).json({ error: true, message: err.message || [] });
  });

  process.on('uncaughtException', (err) => {
    console.error('uncaughtException: ', err);
    console.error(err.stack);
    process.exit(1);
  });
  
  
  module.exports = app;