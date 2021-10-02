module.exports = {
  create: _create,
  getMock: _getMock,
};

function _getName(literal) {
  return literal.name.toLowerCase();
}

function _create(literal) {
  return {
    name: _getName(literal),
    // createdAt:,
    // updatedAt:,
    // createdBy:,
    // updatedBy:,
  };
}

function _getMock(chance, overrides = {}) {
  const literal = Object.assign(
    {
      name: chance.name(),
    },
    overrides
  );

  return _create(literal);
}
