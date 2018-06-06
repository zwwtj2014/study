const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

let cache = {};

function send404(res) {
    res.writeHead(404, {
        "Content-Type": "text/plain"
    });
    res.write("Error 404: resource not found.");
    res.end();
}

function sendFile(res, filePath, fileContent) {
    res.writeHead(200, {
        "Content-Type": mime.getType(path.basename(filePath))
    });
    res.end(fileContent);
}

// 提供静态文件服务
function serveStatic(res, cache, absPath) {
    if (cache[absPath]) {
        sendFile(res, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, exists => {
            if (exists) {
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(res);
                    } else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                });
            } else {
                send404(res);
            }
        });
    }
}

let server = http.createServer((req, res) => {
    let filePath = false;

    if (req.url == "/") {
        filePath = "public/index.html";
    } else {
        filePath = `public${req.url}`;
    }

    let absPath = `./${filePath}`;
    serveStatic(res, cache, absPath);
});

server.listen(3000, () => {
    console.log("Server listening on port 3000.");
});

let chatServer = require("./lib/chat-server");

// 启动Socket.IO
chatServer.listen(server);
