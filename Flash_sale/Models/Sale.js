const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./Product");

const Sale = sequelize.define("Sale", {
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE },
});

Sale.belongsTo(Product);

module.exports = Sale;
