const mongoose = require("mongoose");
const seedData = require("./SeedData");
require("dotenv").config();
const databaseUrl = process.env.DATABASE_URL;

function connect() {
  return mongoose.connect(databaseUrl).then(async () => {
    await seedData();
  });
}

module.exports = { connect };
