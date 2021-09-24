const _KnowledgeRepo = require("./knowledge");
module.exports = (dependencies) => {
  return {
    KnowledgeRepo: _KnowledgeRepo(dependencies),
  };
};
