const { createClient }= require("redis");

const { credentials } = require("../../config/config.json");

const connect = (url) => {
  return createClient({ url }); 
}

module.exports = connect(credentials.redis.url);