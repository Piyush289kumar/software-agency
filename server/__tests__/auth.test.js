import request from "supertest";
import app from "../server.js"; // Adjust path to your server.js

describe("Auth Routes", () => {
  it("should sign in a user with valid credentials", async () => {
    const user = {
      email: "test@example.com",
      password: "password123"
    };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sign In successful");
    expect(res.body._id).toBeDefined();
  });

  it("should return 400 if email or password is missing", async () => {
    const res = await request(app).post("/api/users/sign-in").send({});
    expect(res.statusCode).toBe(400);
  });
});
