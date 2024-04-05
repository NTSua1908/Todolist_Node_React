const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, require: true },
  normalizeName: { type: String, require: true },
});

module.exports = mongoose.model("Role", roleSchema);
