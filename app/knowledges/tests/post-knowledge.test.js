const { expect } = require("chai");
const request = require("supertest");

const Chance = require("chance");
const chance = new Chance();

const app = require("../../../index.js");
const Knowledge = require("../entities/knowledge.js");
const repos = require("../../repos/index.js");

describe("POST /knowledge", () => {
  let payload = null;
  let knowledge = null;
  let KnowledgeRepo = null;

  before(() => {
    KnowledgeRepo = repos({
      db: global.dbConnection,
    }).KnowledgeRepo;
  });

  beforeEach(() => {
    payload = {
      title: chance.sentence(),
      url: chance.url(),
      embed: "",
      embedUrl: "",
      imageUrl: chance.url(),
      tags: [],
      type: "article",
      notes: "",
      description: chance.sentence(),
    };
    knowledge = Knowledge.getMock(chance);
  });

  afterEach(async () => {
    await KnowledgeRepo.removeAll();
  });

  function getPath() {
    return "/knowledges";
  }

  async function saveTestData() {
    await KnowledgeRepo.save(knowledge);
  }

  async function makeRequest(expectedStatus = 200) {
    await saveTestData();
    return request(app)
      .post(getPath())
      .send(payload)
      .set("Accept", "application/json")
      .expect(expectedStatus);
  }

  describe("error path", () => {
    it("should return 400 KNOWLEDGE_EXISTS when passing a new knowledge with an existing url", async () => {
      payload.url = knowledge.url;

      const { body } = await makeRequest(400);

      expect(body).to.deep.equal({
        code: "KNOWLEDGE_EXISTS",
        message: "A knowledge with that url already exists",
      });
    });
  });

  describe("success path", () => {
    it("should return 201 created successfully with the created knowledge information", async () => {
      const { body } = await makeRequest(201);

      expect(Object.keys(body)).to.have.deep.members([
        "_id",
        "title",
        "url",
        "imageUrl",
        "description",
        "notes",
        "tags",
        "type",
        "embedUrl",
        "embed",
      ]);

      expect(body).to.deep.includes({
        title: payload.title,
        url: payload.url,
        imageUrl: payload.imageUrl,
        description: payload.description,
        notes: payload.notes,
        tags: payload.tags,
        type: payload.type,
        embedUrl: payload.embedUrl,
        embed: payload.embed,
      });
    });
  });
});
