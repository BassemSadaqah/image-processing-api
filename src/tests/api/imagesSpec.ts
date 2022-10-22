import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Testing image resizer api user valdiation /api/images", () => {
  it("should return a bad request when user dosen't provide query paramaters  ", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(400);
  });
  it("should return a bad request when the user enters an out of range width value", async () => {
    const response = await request.get("/api/images?width=9999&height=200&filename=file.jpg");
    expect(response.status).toBe(400);
  });
  it("should return a bad request when the user enters an out of range height value", async () => {
    const response = await request.get("/api/images?width=200&height=9999&filename=file.jpg");
    expect(response.status).toBe(400);
  });
  it("should return a bad request when the user enters an invalid filename value", async () => {
    const response = await request.get("/api/images?width=200&height=200&filename=file.php");
    expect(response.status).toBe(400);
  });
  it("should return an error when the user enters an existent filename", async () => {
    const response = await request.get("/api/images?width=200&height=200&filename=898487notFound879578.jpg");
    expect(response.status).toBe(500);
  });
  it("should return 200 ok when provided with valid data [using images/fjord.jpg]", async () => {
    const response = await request.get("/api/images?width=200&height=200&filename=fjord.jpg");
    expect(response.status).toBe(200);
  });
});
