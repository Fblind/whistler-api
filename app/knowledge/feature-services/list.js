// const Knowledge = require("../entities/knowledge");
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

function _execute({ KnowledgeRepo }) {
  return async () => {
    return await KnowledgeRepo.list();
  };
}
