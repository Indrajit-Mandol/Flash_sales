const express = require("express");
const saleController = require("../Controllers/SaleController");
const authenticateToken = require("../Middleware/auth");

const router = express.Router();

router.get("/:id", authenticateToken, saleController.getSaleDetails);

module.exports = router;
