
exports.handleLoginValidation = function handleLoginValidation(req, res, next){
    req.checkBody({
        username: {
            notEmpty: true,
            errorMessage: 'Username should not be empty',
          },
        password: {
        notEmpty: true,
        errorMessage: 'Password should not be empty',
        isLength: {
            options: [{ min: 4, max: 20 }],
            errorMessage: 'Password must be between 4 and 20 chars long',
          },
        },
    });
    const errors = req.validationErrors();
    if (errors) {
        //return res.status(400).json({ error: true, message: util.inspect(errors) });
        return res.status(400).json({ error: true, message: errors });
    }
    return next();
};