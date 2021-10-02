const Tag = require("../entities/tag.js");
module.exports = (dependencies) => {
  return {
    execute: _execute(dependencies),
  };
};

async function validate(TagRepo, data) {
  const tag = await TagRepo.getOneByName(data);
  if (tag) throw new Error("TAG_EXISTS");
}

function _execute({ TagRepo }) {
  return async (data) => {
    await validate(TagRepo, data);
    const tag = Tag.create(data);
    return TagRepo.save(tag);
  };
}
