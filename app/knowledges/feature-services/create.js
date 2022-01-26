const Knowledge = require("../entities/knowledge");
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

async function validate(KnowledgeRepo, data) {
  const knowledge = await KnowledgeRepo.getOneByUrl(data);
  if (knowledge) throw new Error("KNOWLEDGE_EXISTS");
}

function _execute({ KnowledgeRepo }) {
  return async (data) => {
    await validate(KnowledgeRepo, data);
    const knowledge = Knowledge.create(data);
    // TODO: tendria que devolver un entity, y no algo que devuelve el repo de la db
    return await KnowledgeRepo.save(knowledge);
  };
}
