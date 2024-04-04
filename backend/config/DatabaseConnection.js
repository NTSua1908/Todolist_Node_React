const mongoose = require("mongoose");
require("dotenv").config();
const databaseUrl = process.env.DATABASE_URL;

function connect() {
  return mongoose.connect(databaseUrl);
}

module.exports = { connect };
