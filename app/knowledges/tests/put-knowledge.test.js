const { expect } = require("chai");
const request = require("supertest");

const Chance = require("chance");
const chance = new Chance();

const app = require("../../../index.js");
const Knowledge = require("../entities/knowledge.js");
const repos = require("../../repos/index.js");
const { ObjectId } = require("mongodb");

describe("PUT /knowledge", () => {
  let payload = null;
  let knowledgeId = null;
  let knowledge = null;
  let KnowledgeRepo = null;

  before(() => {
    KnowledgeRepo = repos({
      db: global.dbConnection,
    }).KnowledgeRepo;
  });

  beforeEach(() => {
    payload = {
      title: "a title",
    };
    knowledgeId = "asd";
    knowledge = Knowledge.getMock(chance);
  });

  afterEach(async () => {
    await KnowledgeRepo.removeAll();
  });

  function getPath(_knowledgeId) {
    return "/knowledges/" + _knowledgeId;
  }

  async function saveTestData() {
    await KnowledgeRepo.save(knowledge);
  }

  async function makeRequest(expectedStatus = 200) {
    await saveTestData();
    return request(app)
      .put(getPath(knowledgeId))
      .send(payload)
      .set("Accept", "application/json")
      .expect(expectedStatus);
  }

  describe("error path", () => {
    it("should return 400 BODY_IS_REQUIRED when passing an EMPTY object as body", async () => {
      knowledgeId = new ObjectId();
      payload = {};

      const { body } = await makeRequest(400);

      expect(body).to.deep.equal({
        code: "BODY_IS_REQUIRED",
        message: "The body of the request should be a valid knowledge object",
      });
    });

    it("should return 400 WRONG_BODY_KEY when passing some keys that are not part of a valid body", async () => {
      knowledgeId = new ObjectId();
      payload.invalid = "invalid";

      const { body } = await makeRequest(400);

      expect(body).to.deep.equal({
        code: "WRONG_BODY_KEY",
        message: "Invalid body",
      });
    });

    it("should return 400 KNOWLEDGE_NOT_EXISTS when passing an invalid object id as param", async () => {
      knowledgeId = "invalid";

      const { body } = await makeRequest(400);

      expect(body).to.deep.equal({
        code: "KNOWLEDGE_NOT_EXISTS",
        message: "The knowledge that you're trying to update does not exists",
      });
    });

    it("should return 400 KNOWLEDGE_NOT_EXISTS when trying to update a knowledge that not exists", async () => {
      knowledgeId = new ObjectId();

      const { body } = await makeRequest(400);

      expect(body).to.deep.equal({
        code: "KNOWLEDGE_NOT_EXISTS",
        message: "The knowledge that you're trying to update does not exists",
      });
    });
  });

  describe("success path", () => {
    it("should return 200 with the updated knowledge", async () => {
      knowledgeId = knowledge._id.toString();
      payload.title = "THIS NEW TITLE";

      const { body } = await makeRequest(200);

      expect(body.title).to.equal(payload.title);
    });
  });
});
