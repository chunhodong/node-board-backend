const mysql = require('mysql2/promise');
const db_config = require('../config/config.json');
console.log('mysql pool');
module.exports = mysql.createPool({
            host: db_config.host,
            port: db_config.port,
            user: db_config.user,
            password: db_config.password,
            database: db_config.database,
            connectionLimit: db_config.connectionLimit,
            charset : 'utf8mb4'
        });


