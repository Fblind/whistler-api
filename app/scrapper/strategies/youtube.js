const parser = require("../../parser/feature-services/parser");

module.exports = (dependencies) => {
  return {
    scrap: _scrap(dependencies),
  };
};

function _scrap({ axios, cheerio }) {
  return async (url) => {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const desc = {};
    const metas = $("meta").each((_, elem) => {
      const name = $(elem).attr("name");
      const content = $(elem).attr("content");
      if (name) {
        desc[name] = content;
      }
      const ogProperty = $(elem).attr("property");
      const ogContent = $(elem).attr("content");
      if (ogProperty) {
        desc[ogProperty] = ogContent;
      }
    });
    return { ...desc, type: "video" };
  };
}
