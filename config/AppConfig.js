
const development = {
    database: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        dbname: process.env.DB_NAME || 'sampleDb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 13306,
        DATABASE_URL: process.env.DB_URL || 'jdbc:mariadb://192.168.99.100:13306/affiliate_db?useSSL=false&useUnicode=true&characterEncoding=UTF-8',
    },
    jwtSecret: process.env.JWT_SECRET || 'f!DT3[i+Zl(W}17:%@]Tly*#/F&&L',
    encSecretKey: process.env.ENC_SECRET_KEY || 'EDmkTd9jo8QTy6b8',
    appPort: process.env.PORT || 3000,
    jwtIssuer: 'API-TEMPLATE',
};


const production = {
    database: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        dbname: process.env.DB_NAME || 'sampleDb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 13306,
        DATABASE_URL: process.env.DB_URL || 'jdbc:mariadb://192.168.99.100:13306/affiliate_db?useSSL=false&useUnicode=true&characterEncoding=UTF-8',
    },
    jwtSecret: process.env.JWT_SECRET || 'f!DT3[i+Zl(W}17:%@]Tly*#/F&&L',
    encSecretKey: process.env.ENC_SECRET_KEY || 'EDmkTd9jo8QTy6b8',
    appPort: process.env.PORT || 3000,
    jwtIssuer: 'API-TEMPLATE',
};

module.exports = global.process.env.NODE_ENV === 'production' ? production : development;