module.exports = (env) => {
  return {
    db: _getDBConfig(env),
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || "development",
  };
};

function _getDBConfig(env) {
  if (env.NODE_ENV === "production") {
    return {
      url: `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@cluster0.vgcap.mongodb.net`,
      name: "kdb",
    };
  }

  if (env.NODE_ENV === "test") {
    return {
      url: "mongodb://localhost:27017",
      name: "kdb_test",
    };
  }
  return {
    url: "mongodb://localhost:27017",
    name: "kdb",
  };
}
