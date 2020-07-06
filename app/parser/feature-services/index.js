const parser = require('./parser')
module.exports = (dependencies) => {
  return {
    parserService: parser(dependencies)
  }
}
