const Redis = require('ioredis')

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST)

const fn = function (channel, message) {
  redis.publish(channel, message)
}

module.exports = fn
