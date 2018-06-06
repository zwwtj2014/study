const events = require('events');
const net = require('net');

const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(50);

channel.on('join', function (id, client) {
    let welcome = `Welcome! Guests online: ${this.listeners('broadcaset').length}`;
    client.write(welcome + '\n');
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', id => {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, `${id} has left the chat.\n`);
});

channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'Chat has shut down.\n');
    channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {
    let id = client.remoteAddress + ':' + client.remotePort;
    channel.emit('join', id, client);
    client.on('data', data => {
        data = data.toString();
        if (data === 'shutdown\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data)
    });
    client.on('close', () => {
        channel.emit('leave', id);
    });
});
server.listen(8888);