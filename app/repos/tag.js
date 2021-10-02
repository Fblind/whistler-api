const BaseRepo = require("./base.js");
const collection = "tags";

module.exports = (dependencies) => {
  return {
    save: BaseRepo(dependencies)(collection).save,
    list: BaseRepo(dependencies)(collection).list,
    getById: BaseRepo(dependencies)(collection).getById,
    removeAll: BaseRepo(dependencies)(collection).removeAll,
    getOneByName: _getOneByName(dependencies),
  };
};

function _getOneByName(dependencies) {
  return (data) => {
    const _getOneBy = BaseRepo(dependencies)(collection).getOneBy;
    const criteria = { name: data.name.toLowerCase() };
    return _getOneBy(criteria);
  };
}
