const { createClient } = require('redis');
require('dotenv').config();
console.log("🔑 Redis password from .env:", process.env.REDIS_PASS);

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-18009.c244.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 18009
    }
});

module.exports = redisClient;