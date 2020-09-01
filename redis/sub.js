const Redis = require('ioredis')
const channels = Object.values(require('./channels'))

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST)

redis.on('message', function (channel, message) {
  console.info('Message "%s" from channel %s', message, channel)
})

redis.subscribe(channels, function (err, count) {
  if (err) throw err
  console.info('Channels subscribed to, %s ', count)
})
