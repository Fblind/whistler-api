const { expect } = require("chai");
const request = require("supertest");
const Chance = require("chance");
const chance = new Chance();

const app = require("../../../index.js");
const Tag = require("../entities/tag.js");
const repos = require("../../repos/index.js");

const DB = require("../../../local_modules/db.js");
const config = require("../../../config.js")(process.env);

const db = new DB(config.db);

describe("GET /tags", () => {
  let tags = null;
  let dbConnection = null;
  let TagRepo = null;

  before(async () => {
    dbConnection = await db.connect();
    TagRepo = repos({ db: dbConnection }).TagRepo;
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
