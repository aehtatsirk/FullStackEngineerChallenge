const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  name: String,
  jobTitle: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
