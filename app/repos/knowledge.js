// DB deberia ser tipo un ORM
module.exports = (dependencies) => {
  return {
    save: _save(dependencies),
    list: _list(dependencies),
  }
}

function _save ({ db }) {
  return (knowledge) => {
    // TODO: entity.toPersistance(entityObject) ? here or service ?
    // const dbKnowledge = {...knowledge, _id: '1'}
    db.knowledges.push(knowledge)
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
