const taskRouter = require("./taskRouter");

function Router(app) {
  app.use("/api/task/", taskRouter);
}

module.exports = Router;
