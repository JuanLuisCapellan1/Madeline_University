require('dotenv').config();

module.exports = ({
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD
})