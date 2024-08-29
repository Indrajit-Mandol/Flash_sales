const Sale = require("../models/Sale");
const Product = require("../models/Product");

exports.getSaleDetails = async (req, res) => {
  try {
    const sale = await Sale.findOne({
      where: { id: req.params.id },
      include: Product,
    });
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.json({ sale });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
