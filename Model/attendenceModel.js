const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  clock_in_time: {
    type: Date,
    required: true
  },
  clock_out_time: {
    type: Date,
    required: false  // Initially can be null until clock out
  },
  total_duration: {
    type: String,
    required: false  // Can be null until clock out
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
