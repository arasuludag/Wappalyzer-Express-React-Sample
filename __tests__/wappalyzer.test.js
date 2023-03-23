const server = require("../index.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Wappalyzer", () => {
  it("GET /api/analyze/:website analyze a website and return results", async () => {
    const res = await requestWithSupertest.get(
      "/api/analyze/" + encodeURIComponent("https://example.com")
    );
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("numOfURLs");
    expect(res.body).toHaveProperty("technologies");
  });

  it("GET /api/analyze/:website analyze a non-proper website URI and return 403", async () => {
    const res = await requestWithSupertest.get(
      "/api/analyze/" + encodeURIComponent("example.com")
    );
    expect(res.status).toEqual(403);
    expect(res.body).not.toHaveProperty("numOfURLs");
    expect(res.body).not.toHaveProperty("technologies");
  });
});
