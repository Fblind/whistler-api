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

describe("POST /tags", () => {
  let payload = null;
  let tag = null;
  let dbConnection = null;
  let TagRepo = null;

  before(async () => {
    dbConnection = await db.connect();
    TagRepo = repos({ db: dbConnection }).TagRepo;
  });

  beforeEach(() => {
    payload = {
      name: "Javascript",
    };

    tag = Tag.getMock(chance, { name: "nodejs" });
  });

  afterEach(async () => {
    await TagRepo.removeAll();
  });

  function getPath() {
    return "/tags";
  }

  async function saveTestData() {
    await TagRepo.save(tag);
  }

  async function sut(expectedStatus = 200) {
    await saveTestData();
    return request(app)
      .post(getPath())
      .send(payload)
      .set("Accept", "application/json")
      .expect(expectedStatus);
  }

  it("should fail with TAG_EXISTS if the tag requested already exists", async () => {
    payload.name = "nodejs";
    const { body } = await sut(400);
    expect(body).to.deep.equal({
      code: "TAG_EXISTS",
      message:
        "The tag that you're trying to create already exists in the system",
    });
  });

  it("should create a new tag with name in lower cases", async () => {
    const { body } = await sut(200);
    expect(body.name).to.equal("javascript");
    expect(body._id).to.not.equal(undefined);
  });
});
