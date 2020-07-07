const create = require('./create')
const list = require('./list')

module.exports = (dependencies) => {
  return {
    knowledgeCreate: create(dependencies),
    knowledgeList: list(dependencies)
  }
}
