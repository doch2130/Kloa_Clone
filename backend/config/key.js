require("dotenv").config({ path: "./config/.env" });

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    Host: process.env.PRODUCTION_HOST,
    LostArkKey: process.env.LOSTARK_API
  }
} else {
  module.exports = {
    Host: process.env.DEV_HOST,
    LostArkKey: process.env.LOSTARK_API
  }
}