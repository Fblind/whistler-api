const create = require("./create");

module.exports = (dependencies) => {
  return {
    tagsCreate: create(dependencies),
  };
};
