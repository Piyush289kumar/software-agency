import request from "supertest";
import app from "../server.js"; // Adjust path to your server.js

describe("Auth Routes", () => {
  it("should sign in a user with valid credentials", async () => {
    const user = {
      email: "piyushraikwar289@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined(); // Check for token instead of message
    expect(res.body.userId).toBeDefined(); // Check for userId (or _id if you use that)
  });

  it("should return 400 if email or password is missing", async () => {
    const res = await request(app).post("/api/users/sign-in").send({});
    expect(res.statusCode).toBe(400);
  });
});
