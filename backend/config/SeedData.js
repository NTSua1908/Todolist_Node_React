const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Role = require("../models/Role");
const User = require("../models/User");

async function seedData() {
  const existingRoles = await Role.find();

  if (existingRoles.length === 0) {
    var userRoleId = new mongoose.Types.ObjectId("660f646e55fea2af9b2e13a6");
    var managerRoleId = new mongoose.Types.ObjectId("660f647eea00985e73a61797");
    var adminRoleId = new mongoose.Types.ObjectId("660f6484fa5d42433d27aed0");

    await Role.create([
      {
        _id: userRoleId,
        name: "User",
        normalizeName: "USER",
      },
      {
        _id: managerRoleId,
        name: "Manager",
        normalizeName: "MANAGER",
      },
      {
        _id: adminRoleId,
        name: "Admin",
        normalizeName: "ADMIN",
      },
    ]);
    console.log("Initial roles seeded successfully.");

    const existedUsers = await User.find();
    if (existedUsers.length === 0) {
      await User.create([
        {
          username: process.env.DEMO_USER_USERNAME,
          displayName: process.env.DEMO_USER_DISPLAY_NAME,
          email: process.env.DEMO_USER_EMAIL,
          password: bcrypt.hashSync(process.env.DEMO_USER_PASSWORD, 10),
          roles: [userRoleId],
        },
        {
          username: process.env.DEMO_ADMIN_USERNAME,
          displayName: process.env.DEMO_ADMIN_DISPLAY_NAME,
          email: process.env.DEMO_ADMIN_EMAIL,
          password: bcrypt.hashSync(process.env.DEMO_ADMIN_PASSWORD, 10),
          roles: [adminRoleId],
        },
      ]);
      console.log("Initial users seeded successfully.");
    }
  }
}

module.exports = seedData;
