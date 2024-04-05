const express = require("express");
const cors = require("cors");
const database = require("./config/DatabaseConnection");
const Router = require("./routers/router");
const app = express();
const port = 3001;

// const salt = crypto.randomBytes(16).toString("hex");
// process.env.SALT = salt;

app.use(express.json());
app.use(cors({ origin: true }));
Router(app);

database.connect().then(() => {
  app.listen(port, () => {
    console.log("\n====> Database connected\n");
  });
});
