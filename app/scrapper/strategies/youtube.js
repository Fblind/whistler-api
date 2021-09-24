const BaseScrapper = require("../scrapper");

module.exports = (dependencies) => {
  return {
    scrap: _scrap(dependencies),
  };
};

function _scrap({ axios, cheerio }) {
  return async (url) => {
    const defaultScrapper = BaseScrapper({ axios, cheerio });
    const result = await defaultScrapper.scrap(url);
    return { ...result, type: "video" };
  };
}
