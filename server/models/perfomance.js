const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const performanceSchema = new Schema({
  technicalSkill: String,
  softSkill: String,
  attendance: String,
  qualityOfWork: String,
  overallScore: String,
  employeeId: String,
});

module.exports = mongoose.model("Performance", performanceSchema);
