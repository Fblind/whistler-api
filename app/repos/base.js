const { ObjectId } = require("mongodb");

// DB deberia ser tipo un ORM
module.exports = (dependencies) => (collection) => {
  return {
    save: _save(dependencies, collection),
    list: _list(dependencies, collection),
    getById: _getById(dependencies, collection),
    removeAll: _removeAll(dependencies, collection),
    getOneBy: _getOneBy(dependencies, collection),
  };
};

function _save({ db }, collection) {
  return (entity) => {
    return db
      .collection(collection)
      .insertOne(entity)
      .then((response) => {
        return { ...entity, _id: response.insertedId };
      });
  };
}

function _list({ db }, collection) {
  return () => {
    return db.collection(collection).find({}).sort({ _id: -1 }).toArray();
  };
}

function _getById({ db }, collection) {
  return (id) => {
    return db.collection(collection).findOne({ _id: new ObjectId(id) });
  };
}

function _removeAll({ db }, collection) {
  return () => {
    return db.collection(collection).deleteMany({});
  };
}

function _getOneBy({ db }, collection) {
  return (criteria) => {
    return db.collection(collection).findOne(criteria);
  };
}
