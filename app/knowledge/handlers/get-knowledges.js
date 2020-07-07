module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies)
  }
}

function _formatDocument (entity) {
  return entity
}

function _handler ({ knowledgeList }) {
  return async (req, res) => {
    // TODO: validate body
    const response = await knowledgeList.execute()
    return res.status(200).json(_formatDocument(response))
  }
}
