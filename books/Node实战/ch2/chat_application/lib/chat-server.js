const socketio = require('socket.io');

let io;
let guestNumber = 1;
let nickNames = {};
let namesUsed = [];
let currentRoom = {};

exports.listen = function (server) {
    io = socketio.listen(server);
    io.sockets.on('connection', socket => {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');

        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        // 用户发出请求时, 提供已经占用的聊天室的列表
        socket.on('rooms', () => {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket);
    });
};

// 分配用户昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    let name = `Guest${guestNumber}`;
    nickNames[socket.id] = name; // 把用户昵称跟客户端连接ID关联上
    socket.emit('nameResult', { // 让用户知道他们的昵称
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

// 进入聊天室
function joinRoom(socket, room) {
    socket.join(room); // 用户进入房间
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {
        room: room
    }); // 让用户知道他们进入了新房间
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    }); // 让房间里其它用户知道有新用户进入房间

    // 哪些用户在该房间
    let usersInroom = io.sockets.clients(room);
    if (usersInroom.length > 1) {
        let usersInroomSummary = `Users currently in ${room}: `;
        for (const index in usersInroom) {
            const userSocketId = usersInroom[index].id;
            if (userSocketId != socket.id) { // 不是当前用户
                if (index > 0) {
                    usersInroomSummary += ', ';
                }
                usersInroomSummary += nickNames[userSocketId];
            }
        }
        usersInroomSummary += '.';
        socket.emit('message', { // 将房间里其它用户汇总发给当前用户
            text: usersInroomSummary
        });
    }
}

// 处理用户更名请求: 1. 不能以Guest开头; 2. 不能改成其它已经占用的名称
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
    socket.on('nameAttempt', name => {
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: `Names cannot begin with 'Guest'`
            });
        } else {
            if (namesUsed.includes(name)) {
                socket.emit('nameResult', {
                    success: false,
                    message: `That name is already in use.`
                });
            } else { // ok
                let previousName = nickNames[socket.id];
                let previousNameIndex = namesUsed.indexOf(previousName);
                namesUsed.push(name);
                nickNames[socket.id] = name;
                delete namesUsed[previousNameIndex]; // 删除之前用的昵称
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                // 告诉同房间的其他人
                socket.broadcast.to(currentRoom[socket.id]).emit('message', {
                    text: previousName + ' is now knowns as ' + name + '.'
                });
            }
        }
    });
}

// 发送消息
function handleMessageBroadcasting(socket) {
    // message => {room: 'Lobby', text: 'Hi all!'}
    socket.on('message', message => {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ': ' + message.text
        });
    });
}

// 更换房间
function handleRoomJoining(socket) {
    // room => {'newRoom': "Bob's room"}
    socket.on('join', room => {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

function handleClientDisconnection(socket) {
    socket.on('disconnect', () => {
        let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
        delete namesUsed[nameIndex];
        delete nickNames[socket.id];
    });
}