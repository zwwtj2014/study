const net = require('net');
const redis = require('redis');

const server = net.createServer(socket => {
    let subscriber;
    let publisher;

    // 预定信道
    socket.on('connect', () => {
        subscriber = redis.createClient();
        subscriber.subscribe('main_chat_room');
        // 信道收到消息后，把它发给用户
        subscriber.on('message', (channel, message) => {
            socket.write('Channel ' + channel + ': ' + message);
        })

        publisher = redis.createClient();
    });

    socket.on('data', data => {
        publisher.publish('main_chat_room', data);
    });

    socket.on('end', () => {
        subscriber.unsubscribe('main_chat_room');
        subscriber.end();
        publisher.end();
    })
});

server.listen(3000);