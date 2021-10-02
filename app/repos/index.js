const _KnowledgeRepo = require("./knowledge");
const _TagRepo = require("./tag");

module.exports = (dependencies) => {
  return {
    KnowledgeRepo: _KnowledgeRepo(dependencies),
    TagRepo: _TagRepo(dependencies),
  };
};
