const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const limiter = require("../middleware/rateLimiter");

router.post("/register", limiter, register);
router.post("/login", limiter, login);

module.exports = router;