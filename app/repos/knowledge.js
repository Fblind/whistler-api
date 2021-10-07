const BaseRepo = require("./base.js");
const collection = "knowledges";

module.exports = (dependencies) => {
  return {
    save: BaseRepo(dependencies)(collection).save,
    list: BaseRepo(dependencies)(collection).list,
    getById: BaseRepo(dependencies)(collection).getById,
    removeAll: BaseRepo(dependencies)(collection).removeAll,
    updateById: BaseRepo(dependencies)(collection).updateById,
  };
};
