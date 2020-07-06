module.exports = {
  create: _create
}

function _create (literal) {
  // TODO: parse
  console.log(literal)
  return Object.freeze({
    title: literal['og:title'],
    url: literal['og:url'],
    imageUrl: literal['og:image'],
    description: literal['og:description'],
    notes: literal.notes
  })
}
