const Knowledge = require('../../knowledge/entities/knowledge')
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies)
  }
}

function _execute ({ scrapper }) {
  return async (url) => {
    const response = await scrapper.scrap(url)
    return Knowledge.parse(response)
  }
}
