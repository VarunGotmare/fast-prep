// filepath: /C:/Users/varun/OneDrive/Desktop/HackWhack/fast-prep/backend/routes/auth.js
const express = require("express");
const { registerUser, loginUser, getUser } = require("../controllers/authController");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get User Details Route
router.get("/me", getUser);

module.exports = router;