module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies)
  }
}

function _formatDocument (entity) {
  return entity
}

function _handler ({ knowledgeGet }) {
  return async (req, res) => {
    const response = await knowledgeGet.execute(req.params.id)
    return res.status(200).json(_formatDocument(response))
  }
}
