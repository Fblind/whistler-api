// dependencies should be one ?
module.exports = (dependencies) => {
  return {
    handler: _handler(dependencies)
  }
}

function _handler ({ parserService }) {
  return async (req, res) => {
    const response = await parserService.execute(req.body.url)
    return res.status(200).json({ parser: response })
  }
}
