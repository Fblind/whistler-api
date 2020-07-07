module.exports = {
  create: _create,
  parse: _parse
}

function _getTitle (literal) {
  return literal['og:title'] || literal['twitter:title'] || literal['title']
}

function _getUrl (literal) {
  return literal['og:url']
}

function _getImageUrl (literal) {
  return literal['og:image']
}

function _getDescription (literal) {
  return literal['og:description']
}

function _getNotes (literal) {
  return literal.notes
}

function _getTags (literal) {
  // TODO: merge
  return literal.tags
}

function _parse (literal) {
  // TODO: Parse from a url to a knowledge
  return _create({
    title: _getTitle(literal),
    url: _getUrl(literal),
    imageUrl: _getImageUrl(literal),
    description: _getDescription(literal),
    notes: _getNotes(literal),
    tags: _getTags(literal)
  })
}

function _create (literal) {
  // TODO: validations
  return Object.freeze({
    title: literal.title,
    url: literal.url,
    imageUrl: literal.imageUrl,
    description: literal.description,
    notes: literal.notes,
    tags: literal.tags
  })
}
