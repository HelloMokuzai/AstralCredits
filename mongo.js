const mongo = require('mongodb');

let client = new mongo.MongoClient(process.env.mongo_connection_string, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
  getDb: async function() {
    await client.connect();
    return client.db('db');
  },
};
