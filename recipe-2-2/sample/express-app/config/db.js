const mysql = require('mysql2')

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'db',
  user: 'appuser',
  password: 'mysql',
  database: 'test',
})

module.exports = promisePool = pool.promise()
