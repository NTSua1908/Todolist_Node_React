const express = require("express");
const Router = express.Router();
const authController = require("../controllers/AuthController");

Router.post("/login", authController.login);
Router.post("/refreshToken", authController.refreshToken);

module.exports = Router;
