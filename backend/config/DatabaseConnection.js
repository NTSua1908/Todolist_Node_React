const mongoose = require("mongoose");

function connect() {
  return mongoose.connect(
    "mongodb+srv://admin:V2a7ewqY73jusrpR@cluster0.pmosntk.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0"
  );
}

module.exports = { connect };
