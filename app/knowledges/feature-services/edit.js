module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

async function validate(data) {
  if (!data.id) throw new Error("KNOWLEDGE_ID_REQUIRED");
  return true;
}

function _execute({ KnowledgeRepo }) {
  return async (data) => {
    await validate(data);
    const knowledgeId = data.id;
    Reflect.deleteProperty(data, "id");
    const knowledge = await KnowledgeRepo.updateById(knowledgeId, data);
    if (!knowledge) throw new Error("KNOWLEDGE_NOT_EXISTS");
    return knowledge;
  };
}
