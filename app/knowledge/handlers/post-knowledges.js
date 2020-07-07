// dependencies should be one ?
module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies)
  }
}

function _formatDocument (entity) {
  return entity
}

function _handler ({ knowledgeCreate }) {
  return async (req, res) => {
    // TODO: validate body
    const response = await knowledgeCreate.execute(req.body)
    return res.status(200).json(_formatDocument(response))
  }
}
