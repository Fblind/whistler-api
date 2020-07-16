// 1 scrapping url
// 2 parser meta tags
// 3 return a parser object

// modules needed => request, cheerio, pupettear
// npm install axios cheerio puppeteer --save

module.exports = (dependencies) => {
  return {
    scrap: _scrap(dependencies)
  }
}

function _scrap ({ axios, cheerio }) {
  // axios, cheerio, puppeteer
  // TODO: wrap axios
  return async (url) => {
    // url = 'https://fblind.github.io/blog/html-semantic'
    const { data: html } = await axios.get(url)
    const $ = cheerio.load(html)
    const desc = []
    const metas = $('meta')
      .each((_, elem) => {
        // const data = $(elem).attr()
        // name - content
        // property - content
        // PoC get only og tags, each service tendria
        const name = $(elem).attr('name')
        const content = $(elem).attr('content')
        if (name) {
          desc[name] = content
        }
        const ogProperty = $(elem).attr('property')
        const ogContent = $(elem).attr('content')
        if (ogProperty) {
          desc[ogProperty] = ogContent
        }
      })
    return desc
  }
}
