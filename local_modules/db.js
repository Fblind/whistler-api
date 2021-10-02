const { MongoClient } = require("mongodb");

class DB {
  constructor(config, logger = console) {
    this.config = config;
    this.logger = logger;
    this.client = MongoClient;
    this.connections = {};
  }

  getExistingConnection(url) {
    return this.connections[url];
  }

  connect() {
    if (this.getExistingConnection(this.config.url))
      return this.getExistingConnection(this.config.url);

    return new Promise((resolve, reject) => {
      this.client.connect(this.config.url, (err, client) => {
        if (err) return reject(err);
        const db = client.db(this.config.name, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        this.logger.info("Connected successfully to db");
        this.connections[this.config.url] = db;
        return resolve(db);
      });
    });
  }
}

module.exports = DB;
