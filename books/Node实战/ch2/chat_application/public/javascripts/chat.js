function Chat(socket) {
    this.socket = socket;
}

Chat.prototype.sendMessage = function (room, text) {
    let message = {
        room: room,
        text: text
    };
    this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function (room) {
    this.socket.emit('join', {
        newRoom: room
    });
}

Chat.prototype.processCommand = function (command) {
    let words = command.split(' ');
    let command = words[0].substring(1, words[0].length).toLowerCase();
    let message = false;

    switch (command) {
        case 'join':
            words.shift();
            let room = words.join(' ');
            this.changeRoom(room);
            break;
        case 'nick':
            words.shift();
            let name = words.join(' ');
            this.socket.emit('nameAttempt', name);
            break;
        default:
            break;
    }
}