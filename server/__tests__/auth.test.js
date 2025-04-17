import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js"; // Adjust path if needed

describe("Auth Routes", () => {
  // Test case 1: User sign-in with valid credentials
  it("should sign in a user with valid credentials", async () => {
    const user = {
      email: "piyushraikwar289@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 2: Missing email
  it("should return 400 if email is missing", async () => {
    const user = { password: "123456" };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 3: Missing password
  it("should return 400 if password is missing", async () => {
    const user = { email: "piyushraikwar289@gmail.com" };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 4: Invalid email format
  it("should return 400 if email format is invalid", async () => {
    const user = { email: "invalid-email", password: "123456" };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 5: User does not exist
  it("should return 404 if user does not exist", async () => {
    const user = { email: "nonexistent@gmail.com", password: "123456" };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(404);
    expect(res.body._id).toBeDefined();
  });

  // Test case 6: Incorrect password
  it("should return 401 if password is incorrect", async () => {
    const user = { email: "piyushraikwar289@gmail.com", password: "wrongpassword" };

    const res = await request(app).post("/api/users/sign-in").send(user);

    expect(res.statusCode).toBe(401);
    expect(res.body._id).toBeDefined();
  });

  // Test case 7: Successful registration of a new user
  it("should register a new user successfully", async () => {
    const user = {
      email: "newuser@example.com",
      password: "123456",
      name: "New User",
    };

    const res = await request(app).post("/api/users/sign-up").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 8: Email already in use during registration
  it("should return 400 if email is already in use", async () => {
    const user = {
      email: "piyushraikwar289@gmail.com",
      password: "123456",
      name: "Existing User",
    };

    const res = await request(app).post("/api/users/sign-up").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 9: Password too short
  it("should return 400 if password is too short", async () => {
    const user = { email: "test@example.com", password: "123", name: "Short Password User" };

    const res = await request(app).post("/api/users/sign-up").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 10: Invalid user role during registration
  it("should return 400 if user role is invalid", async () => {
    const user = { email: "test@example.com", password: "123456", role: "invalidrole" };

    const res = await request(app).post("/api/users/sign-up").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 11: User sign-out success
  it("should sign out a user successfully", async () => {
    const res = await request(app).post("/api/users/sign-out");

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 12: Invalid sign-out request without a session
  it("should return 400 for invalid sign-out request", async () => {
    const res = await request(app).post("/api/users/sign-out");

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 13: User password reset request
  it("should send a password reset link", async () => {
    const user = { email: "piyushraikwar289@gmail.com" };

    const res = await request(app).post("/api/users/password-reset").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 14: User password reset request with invalid email
  it("should return 400 for password reset with invalid email", async () => {
    const user = { email: "invalid-email@example.com" };

    const res = await request(app).post("/api/users/password-reset").send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 15: Password reset with valid token
  it("should reset the password with a valid token", async () => {
    const resetData = {
      token: "valid-token",
      newPassword: "newpassword123",
    };

    const res = await request(app).post("/api/users/password-reset/confirm").send(resetData);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 16: Password reset with invalid token
  it("should return 400 for invalid password reset token", async () => {
    const resetData = {
      token: "invalid-token",
      newPassword: "newpassword123",
    };

    const res = await request(app).post("/api/users/password-reset/confirm").send(resetData);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 17: Update user profile with valid data
  it("should update user profile successfully", async () => {
    const updateData = { name: "Updated Name", email: "updated@example.com" };

    const res = await request(app).put("/api/users/update-profile").send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 18: Update user profile with invalid data
  it("should return 400 for invalid profile update", async () => {
    const updateData = { name: "", email: "invalid-email" };

    const res = await request(app).put("/api/users/update-profile").send(updateData);

    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeDefined();
  });

  // Test case 19: Retrieve user profile data
  it("should retrieve user profile data", async () => {
    const res = await request(app).get("/api/users/profile");

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  // Test case 20: Unauthorized access to protected route
  it("should return 401 for unauthorized access to protected route", async () => {
    const res = await request(app).get("/api/users/profile");

    expect(res.statusCode).toBe(401);
    expect(res.body._id).toBeDefined();
  });

  // Cleanup
  afterAll(async () => {
    await mongoose.connection.close(); // Close DB connection
  });
});
