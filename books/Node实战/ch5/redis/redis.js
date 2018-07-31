const redis = require('redis');

// 连接redis数据库
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error', function (err) {
    console.log(err);
})

// 操作redis
// 1. key-value
redisClient.set('color', 'red', redis.print);
redisClient.get('color', function (err, value) {
    if (err) {
        console.log(err);
    }
    console.log('color: ' + value);
})

// 2. 哈希表
redisClient.hmset('camping', {
    'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

redisClient.hget('camping', 'cooking', function (err, value) {
    if (err) {
        throw err;
    }
    console.log('Will be cooking with: ' + value);
});

redisClient.hkeys('camping', (err, keys) => {
    if (err) {
        throw err;
    }
    console.log(keys)
    console.log('keys: ' + Array.from(keys));
});

// 3. 链表
redisClient.lpush('tasks', 'Paint the bikesjed red.', redis.print)
redisClient.lpush('tasks', 'Paint the bikesjed red.', redis.print)
redisClient.lpush('tasks', 'Paint the bikesjed green.', redis.print)
redisClient.lrange('tasks', 0, -1, (err, items) => {
    if (err) {
        throw err;
    }
    console.log('items: ' + Array.from(items));
})

// 4. 数组
redisClient.sadd('ip_address', '204.10.37.96', redis.print);
redisClient.sadd('ip_address', '204.10.37.96', redis.print);
redisClient.sadd('ip_address', '72.32.231.8', redis.print);
redisClient.smembers('ip_address', (err, members) => {
    if (err) {
        throw err;
    }
    console.log('members: ' + Array.from(members));
})