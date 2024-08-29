const express = require("express");
const orderController = require("../Controllers/OrderController");
const authenticateToken = require("../Middleware/auth");
const rateLimiter = require("../Middleware/RateLimiter");

const router = express.Router();

router.post("/", authenticateToken, rateLimiter, orderController.placeOrder);

module.exports = router;
