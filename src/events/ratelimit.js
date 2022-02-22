const ms = require("ms");

module.exports = {
  name: "rateLimit",
  once: false,

  run: (bot, data) => {
    console.log(`[RATELIMIT] You are being ratelimited for exceeding ${data.limit} endpoint requests, this will expire in ${ms(data.timeout, { long: true })}.`)
  }
}