require('dotenv/config')


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    connectString: process.env.DB_CONNECTSTRING
}

module.exports = config;
