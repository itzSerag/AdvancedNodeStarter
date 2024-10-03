const mongoose = require("mongoose");
const util = require("util");
const redis = require("redis");

const client = redis.createClient({ url: "redis://127.0.0.1:6379" });
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  this.useCache = this.useCache || false;

  if (!this.useCache) {
    console.log("NO CACHE, RUNNING NORMAL QUERY");
    return await exec.apply(this, arguments);
  }

  console.log("RUNNING QUERY WITH CACHE");

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cachedResult = await client.get(key);

  if (cachedResult) {
    const doc = JSON.parse(cachedResult);
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  // normal return
  const result = await exec.apply(this, arguments);

  // Store result in cache with a TTL of 60 seconds
  client.set(key, JSON.stringify(result), "EX", 60);

  return result;
};
