const Knowledge = require('../entities/knowledge')
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies)
  }
}

function _execute ({ KnowledgeRepo }) {
  return async (data) => {
    const dbKnowledge = await KnowledgeRepo.getById(data)
    return Knowledge.create(dbKnowledge)
  }
}
