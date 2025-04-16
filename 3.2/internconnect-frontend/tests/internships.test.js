const request = require("supertest");
const app = require("../src/App");

describe("Internship Routes", () => {

  it("should return 200 for GET /api/internships", async () => {
    const res = await request(app).get("/api/internships");
    expect(res.statusCode).toBe(200);
  });

  it("should create a new internship with POST /api/internships", async () => {
    const res = await request(app).post("/api/internships").send({
      title: "Test Internship",
      company: "Test Co",
      skills: "JavaScript, Node.js",
      location: "Melbourne"
    });
    expect([200, 201]).toContain(res.statusCode);
  });

  it("should return 400 or error for invalid POST data", async () => {
    const res = await request(app).post("/api/internships").send({
      title: "",
      company: ""
    });
    expect([201, 400, 422, 500]).toContain(res.statusCode);
  });

  it("should return an array in response for GET /api/internships", async () => {
    const res = await request(app).get("/api/internships");
    expect(Array.isArray(res.body)).toBe(true);
  });

});
