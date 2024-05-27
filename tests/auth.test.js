const request = require("supertest");
const app = require("../server"); // Assuming app is exported from server.js

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      username: "testuser",
      password: "testpass",
      email: "testuser@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("username");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "testuser@example.com",
      password: "testpass",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // Other tests...
});
