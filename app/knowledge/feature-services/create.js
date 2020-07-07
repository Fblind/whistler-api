const Knowledge = require('../entities/knowledge')
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies)
  }
}

function _execute ({ KnowledgeRepo }) {
  return async (data) => {
    const knowledge = Knowledge.create(data)
    await KnowledgeRepo.save(knowledge)
    return knowledge
  }
}
