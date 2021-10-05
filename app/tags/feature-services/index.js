const create = require("./create");
const list = require("./list");

module.exports = (dependencies) => {
  return {
    tagsCreate: create(dependencies),
    tagsList: list(dependencies),
  };
};
