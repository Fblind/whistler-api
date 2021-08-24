module.exports = {
  create: _create,
  parse: _parse,
};

function _getTitle(literal) {
  return literal["og:title"] || literal["twitter:title"] || literal["title"];
}

function _getUrl(literal) {
  return literal["og:url"];
}

function _getImageUrl(literal) {
  return literal["og:image"];
}

function _getDescription(literal) {
  return literal["og:description"] || literal["description"] || "";
}

function _getNotes(literal) {
  return literal.notes;
}

function _getTags(literal) {
  // TODO: merge
  return literal.tags || [];
}

function _getType(literal) {
  return literal.type || "article";
}

function _getEmbedUrl(literal) {
  if (literal.type === "audio") return literal.embedUrl;
  return "";
}

function _getEmbed(literal) {
  if (literal.type === "audio") return literal.embed;
  return "";
}

function _parse(literal) {
  // TODO: Parse from a url to a knowledge
  return _create({
    title: _getTitle(literal),
    url: _getUrl(literal),
    imageUrl: _getImageUrl(literal),
    description: _getDescription(literal),
    notes: _getNotes(literal),
    tags: _getTags(literal),
    type: _getType(literal),
    embedUrl: _getEmbedUrl(literal),
    embed: _getEmbed(literal),
  });
}

function _create(literal) {
  // TODO: validations
  console.log(literal);
  return {
    id: literal.id || literal._id,
    title: literal.title,
    url: literal.url,
    imageUrl: literal.imageUrl,
    description: literal.description,
    notes: literal.notes,
    tags: literal.tags,
    type: literal.type || "article",
    embedUrl: literal.embedUrl,
    embed: literal.embed,
  };
}
