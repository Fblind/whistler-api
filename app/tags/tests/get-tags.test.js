const { expect } = require("chai");
const request = require("supertest");
const Chance = require("chance");
const chance = new Chance();

const app = require("../../../index.js");
const Tag = require("../entities/tag.js");
const repos = require("../../repos/index.js");

describe("GET /tags", () => {
  let tags = null;
  let TagRepo = null;

  before(async () => {
    TagRepo = repos({ db: global.dbConnection }).TagRepo;
  });

  beforeEach(() => {
    tags = [Tag.getMock(chance, { name: "nodejs" }), Tag.getMock(chance)];
  });

  afterEach(async () => {
    await TagRepo.removeAll();
  });

  function getPath() {
    return "/tags";
  }

  async function saveTestData() {
    for (const tag of tags) {
      await TagRepo.save(tag);
    }
  }

  async function sut(expectedStatus = 200) {
    await saveTestData();
    return request(app)
      .get(getPath())
      .query({})
      .set("Accept", "application/json")
      .expect(expectedStatus);
  }

  it("should return all tags", async () => {
    const { body } = await sut(200);
    expect(body).to.have.length(2);
  });
});
