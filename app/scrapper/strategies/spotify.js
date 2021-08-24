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
    const $ = result.$;
    const embedUrl = $("link[type='application/json+oembed']")
      .attr("href")
      .toString();
    const { data } = await axios.get(embedUrl);
    const embed = data.html;

    return {
      ...result,
      type: "audio",
      embedUrl,
      embed,
    };
  };
}
