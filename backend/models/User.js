const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, require: true, minLength: 3 },
  displayName: { type: String, require: true, minLength: 3 },
  email: { type: String, require: true },
  password: { type: String, require: true, minLength: 6 },
  refreshToken: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
