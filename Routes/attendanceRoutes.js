const { Router } = require("express");
const router = Router();
const authMiddleware = require('../Middleware/authMiddelware');
const {
  clockIn,
  clockOut,
  getUserAttendance,
  getAllAttendance
} = require("../Controller/attendanceController");

// Routes for attendance
router.post('/clockin', authMiddleware, clockIn);
router.post('/clockout', authMiddleware, clockOut);
router.get('/user', authMiddleware, getUserAttendance);
router.get('/all', authMiddleware, getAllAttendance); // Restricted to admins

module.exports = router;
