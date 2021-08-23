module.exports = (dependencies) => {
  return {
    factory: _factory(dependencies),
  };
};

// TODO: npm install --save psl may help
// TODO: cada strategy puede tener sus propios sdk
function _factory(dependencies) {
  return (urlStringified) => {
    const url = new URL(urlStringified);
    const youtubeDomains = ["youtu.be", "youtube"];
    if (youtubeDomains.includes(url.hostname))
      return require("./strategies/youtube")(dependencies);
    return require("./scrapper")(dependencies);
  };
}
