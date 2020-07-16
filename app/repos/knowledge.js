// DB deberia ser tipo un ORM
module.exports = (dependencies) => {
  return {
    save: _save(dependencies),
    list: _list(dependencies),
    getById: _getById(dependencies)
  }
}

function getId (size) {
  return size + 1
}

function _save ({ db }) {
  return (knowledge) => {
    // TODO: entity.toPersistance(entityObject) ? here or service ?
    const dbKnowledge = {...knowledge, _id: getId(db.knowledges.length)}
    db.knowledges.push(dbKnowledge)
    // TODO: entity.toEntity(dbObject) ?
    return Promise.resolve(knowledge)
  }
}

function _list ({ db }) {
  return () => {
    const knowledges = db.knowledges
    // .map(Knowledge.toEntity)
    return Promise.resolve(knowledges)
  }
}

function _getById ({ db }) {
  return (id) => {
    const knowledges = db.knowledges
    const knowledge = knowledges.find(knowledge => knowledge._id.toString() === id.toString())
    return Promise.resolve(knowledge)
  }
}
