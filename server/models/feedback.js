const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  reviewerId: String, // reviwer Id
  performanceId: String, // performance Id
  comment: String,
  isSubmitted: Boolean,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
