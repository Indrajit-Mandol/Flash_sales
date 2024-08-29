const Product = require("../models/Product");
const Order = require("../models/Order");
const Sale = require("../models/Sale");

exports.placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findOne({ where: { id: productId } });
    const sale = await Sale.findOne({ where: { productId } });

    const now = new Date();
    if (now < sale.startTime || (sale.endTime && now > sale.endTime)) {
      return res.status(400).json({ message: "Sale is not active" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const existingOrder = await Order.findOne({
      where: { userId: req.user.id, productId },
    });
    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "You have already purchased this item" });
    }

    const order = await Order.create({
      userId: req.user.id,
      productId,
      quantity,
      timestamp: now,
    });

    await product.update({ stock: product.stock - quantity });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
