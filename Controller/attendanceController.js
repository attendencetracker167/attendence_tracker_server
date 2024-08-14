const Attendance = require("../Model/attendenceModel");
const User = require("../Model/userModel");

// Clock In
const clockIn = async (req, res) => {
  const userId = req.user.id; // Assuming auth middleware adds user info to req
  const now = new Date();

  try {
    // const existingRecord = await Attendance.findOne({ user: userId, clock_out_time: null });
    // if (!existingRecord) {
    //   return res.status(400).json({ message: "You have already clocked in." });
    // }

    const attendanceRecord = new Attendance({
      user: userId,
      date: now,
      clock_in_time: now,
    });

    await attendanceRecord.save();
    res.status(200).json({ message: "Clock-in successful", attendanceRecord });
  } catch (err) {
    res.status(500).json({ message: "Error clocking in", error: err.message });
  }
};

// Clock Out
const clockOut = async (req, res) => {
  const userId = req.user.id; // Assuming auth middleware adds user info to req
  const now = new Date();

  try {
    const attendanceRecord = await Attendance.findOne({ user: userId, clock_out_time: null });
    // if (!attendanceRecord) {
    //   return res.status(400).json({ message: "No active clock-in found." });
    // }

    attendanceRecord.clock_out_time = now;
    const durationMillis = now - attendanceRecord.clock_in_time;
    const hours = Math.floor(durationMillis / (1000 * 60 * 60));
    const minutes = Math.floor((durationMillis % (1000 * 60 * 60)) / (1000 * 60));
    attendanceRecord.total_duration = `${hours} hours, ${minutes} minutes`;

    await attendanceRecord.save();
    res.status(200).json({ message: "Clock-out successful", attendanceRecord });
  } catch (err) {
    res.status(500).json({ message: "Error clocking out", error: err.message });
  }
};

// Get User Attendance Records
const getUserAttendance = async (req, res) => {
  const userId = req.user.id; // Assuming auth middleware adds user info to req

  try {
    const attendanceRecords = await Attendance.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving attendance records", error: err.message });
  }
};

// Get All Attendance Records (Admin)
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('user').sort({ date: -1 });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving all attendance records", error: err.message });
  }
};

module.exports = {
  clockIn,
  clockOut,
  getUserAttendance,
  getAllAttendance,
};
