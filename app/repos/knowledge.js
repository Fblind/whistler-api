const { ObjectId } = require("mongodb");

// DB deberia ser tipo un ORM
module.exports = (dependencies) => {
  return {
    save: _save(dependencies),
    list: _list(dependencies),
    getById: _getById(dependencies),
  };
};

function _save({ db }) {
  return (knowledge) => {
    return db.collection("knowledges").insertOne(knowledge);
    // TODO: entity.toPersistance(entityObject) ? here or service ?
    // const dbKnowledge = { ...knowledge, _id: getId(db.knowledges.length) };
    // db.knowledges.push(dbKnowledge);
    // // TODO: entity.toEntity(dbObject) ?
    // return Promise.resolve(knowledge);
  };
}

function _list({ db }) {
  return () => {
    return db.collection("knowledges").find({}).sort({ _id: -1 }).toArray();
    // const knowledges = db.knowledges;
    // // .map(Knowledge.toEntity)
    // return Promise.resolve(knowledges);
  };
}

function _getById({ db }) {
  return (id) => {
    return db.collection("knowledges").findOne({ _id: new ObjectId(id) });
    // const knowledges = db.knowledges;
    // const knowledge = knowledges.find(
    //   (knowledge) => knowledge._id.toString() === id.toString()
    // );
    // return Promise.resolve(knowledge);
  };
}
