const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const validator = require("../validators/authValidator");

/* SIGN IN BY PASSWORD */
router.post("/signInByPassword", validator.signInByPasswordValidator, authController.signInByPassword);
// http://localhost:2024/api/V1/auth/signInByPassword

/* SIGN IN BY OTP */
router.post('/send-otp', validator.sendOtpValidator, authController.sendOtpToEmployee);
// http://localhost:2024/api/V1/auth/send-otp

/* SIGN IN BY OTP */
router.post('/signInByOtp', validator.signInByOtpValidator, authController.loginWithOtp);
// http://localhost:2024/api/V1/auth/signInByOtp

module.exports = router;