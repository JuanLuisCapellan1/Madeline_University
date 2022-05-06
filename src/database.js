const mysql = require('promise-mysql');
const config = require('./config');

const connection = mysql.createConnection({
  host: config.HOST,
  database: config.DATABASE,
  user: config.USER,
  password: config.PASSWORD
});

const getConnection = () => {
  return connection;
}

module.exports = { getConnection };
