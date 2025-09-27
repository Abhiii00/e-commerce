const dotenv = require('dotenv');
dotenv.config();

module.exports = {

      DB_STRING : process.env.DB_STRING,
      PORT: process.env.PORT,
      STRIPEKEY: process.env.STP_KEY
}