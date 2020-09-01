// Subscribe to redis message channels
require('./sub')

const publish = require('./pub')
const channels = require('./channels')

// Test publish
publish(Object.values(channels)[0], 'Test message')
