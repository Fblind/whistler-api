const { MongoClient, ObjectId } = require("mongodb");

let instances = {};

class DB {
  constructor(config, logger = console) {
    if (!instances[config.url]) {
      this.config = config;
      this.logger = logger;
      this.client = MongoClient;
      this.connections = {};
      instances[this.config.url] = this;
    }
    return instances[config.url];
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

  isValidObjectId(id) {
    return ObjectId.isValid(id);
  }
}

module.exports = DB;
