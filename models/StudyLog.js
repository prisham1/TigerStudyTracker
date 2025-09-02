const mongoose = require('mongoose');

const studyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  duration: Number,
  location: String,
  productivity: Number,
  activity: String,  // e.g. COS324 - Reading
  notes: String,
  timestamp: { type: Date, default: Date.now }
});

//  Schema hardening + index (better validation and speed) 
studyLogSchema.index({ userId: 1, timestamp: -1 });
studyLogSchema.index({ userId: 1, location: 1 });
studyLogSchema.index({ userId: 1, activity: 1 });

module.exports = mongoose.model('StudyLog', studyLogSchema);
