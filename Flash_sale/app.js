const express = require("express");
const saleRoutes = require("./Routes/SaleRoutes");
const orderRoutes = require("./Routes/OrderRoutes");

const app = express();

app.use(express.json());

app.use("/api/sales", saleRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
