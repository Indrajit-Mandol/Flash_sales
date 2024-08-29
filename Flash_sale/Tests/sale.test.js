const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../config/db");
const Sale = require("../Models/Sale");

describe("Sale API", () => {
  beforeAll(async () => {
    // Setup test data
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Clean up test data
    await sequelize.close();
  });

  test("Should fetch sale details", async () => {
    const sale = await Sale.create({ startTime: new Date(), productId: 1 });
    const res = await request(app)
      .get(`/api/sales/${sale.id}`)
      .set("Authorization", `Bearer testtoken`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sale).toHaveProperty("productId");
  });
});
