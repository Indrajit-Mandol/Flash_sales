const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Product = require("./Product");

const Order = sequelize.define("Order", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false },
});

Order.belongsTo(User);
Order.belongsTo(Product);

module.exports = Order;
