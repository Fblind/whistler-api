const Knowledge = require("../entities/knowledge");
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

function _execute({ KnowledgeRepo }) {
  return async (data) => {
    const knowledge = Knowledge.create(data);
    // TODO: tendria que devolver un entity, y no algo que devuelve el repo de la db
    return await KnowledgeRepo.save(knowledge);
  };
}
