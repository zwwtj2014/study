function divEscapeContentElement(message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html(`<i>${message}</i>`);
}

function processUserInput(chatApp, socket) {
    let message = $('#send-message').val();
    let systemMessage;

    if (message.charAt(0) == '/') {
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#messages').append(divEscapeContentElement(message));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }

    $('#send-message').val('');
}

const socket = io.connect();

$(document).ready(function () {
    let chatApp = new Chat(socket);

    // 显示更名尝试的结果
    socket.on('nameResult', result => {
        let message;
        if (result.success) {
            message = 'You are now known as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#messages').append(divSystemContentElement(message));
    });

    // 房间变更
    socket.on('joinResult', result => {
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room changed.'));
    });

    // 显示接受到的消息
    socket.on('message', message => {
        let newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });

    socket.on('rooms', rooms => {
        $('#room-list').empty();
        for (const room in rooms) {
            room = room.substring(1, room.length);
            if (room != '') {
                $('#room-list').append(divEscapeContentElement(room));
            }
        }

        $('#room-list div').click(() => {
            chatApp.processCommand('/join' + $(this).text());
            $('#send-message').focus();
        });
    });

    setInterval(() => {
        socket.emit('rooms');
    }, 1000);

    $('#send-message').focus();

    $('#send-form').submit(() => {
        processUserInput(chatApp, socket);
        return false;
    });
});