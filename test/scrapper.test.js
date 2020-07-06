const { expect } = require('chai')

describe('Scrapper Service', () => {
  describe('#scrap', () => {
    let url = null
    let urlResponse = null
    beforeEach(() => {

    })

    it('should scrap an url', () => {
      const html = ScrapperService.scrap(url)
      expect(html).to.equal(urlResponse)
    })
  })
});
