const create = require("./create");
const list = require("./list");
const get = require("./get");
const edit = require("./edit");

module.exports = (dependencies) => {
  return {
    knowledgeCreate: create(dependencies),
    knowledgeList: list(dependencies),
    knowledgeGet: get(dependencies),
    knowledgeEdit: edit(dependencies),
  };
};
