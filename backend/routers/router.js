const taskRouter = require("./task.Routers");
const authRouter = require("./auth.Routers");

function Router(app) {
  app.use("/api/task/", taskRouter);
  app.use("/api/auth", authRouter);
}

module.exports = Router;
