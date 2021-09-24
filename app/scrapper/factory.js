module.exports = (dependencies) => {
  return {
    factory: _factory(dependencies),
  };
};
/**
 *
 * @param {URL} url
 * @returns {boolean} if the url passed is from spotify
 */

function isSpotify(url) {
  const spotifyDomains = ["spotify", "open.spotify", "open.spotify.com"];
  return spotifyDomains.includes(url.hostname);
}

/**
 *
 * @param {URL} url
 * @returns {boolean} if the url passed is from youtube
 */

function isYoutube(url) {
  const youtubeDomains = ["youtu.be", "youtube", "www.youtube.com"];
  return youtubeDomains.includes(url.hostname);
}
// TODO: npm install --save psl may help
// TODO: cada strategy puede tener sus propios sdk
function _factory(dependencies) {
  return (urlStringified) => {
    const url = new URL(urlStringified);
    console.log("HOSTNAME: ", url.hostname);
    if (isYoutube(url)) return require("./strategies/youtube")(dependencies);
    if (isSpotify(url)) return require("./strategies/spotify")(dependencies);
    return require("./scrapper")(dependencies);
  };
}
