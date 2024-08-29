const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../config/db");
const Product = require("../Models/Product");
const Sale = require("../Models/Sale");

describe("Order API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Should place an order", async () => {
    const product = await Product.create({
      name: "iPhone",
      price: 999,
      stock: 100,
    });
    const sale = await Sale.create({
      productId: product.id,
      startTime: new Date(),
    });

    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer testtoken`)
      .send({ productId: product.id, quantity: 1 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.order).toHaveProperty("quantity", 1);
  });
});
