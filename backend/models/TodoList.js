const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  isDone: { type: Boolean, require: true },
});

module.exports = mongoose.model("Task", taskSchema);
