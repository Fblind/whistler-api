const Knowledge = require("../../knowledge/entities/knowledge");
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

function _execute({ scrapperFactory }) {
  return async (url) => {
    const scrapper = scrapperFactory.factory(url);
    const response = await scrapper.scrap(url);
    return Knowledge.parse(response);
  };
}
