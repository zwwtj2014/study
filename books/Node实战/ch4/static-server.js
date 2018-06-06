const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;

const server = http.createServer(function (req, res) {
    const url = parse(req.url);
    const path = join(root, url.pathname);
    const readStream = fs.createReadStream(path); // 创建一个从磁盘读取文件的流
    readStream.on('data', function (chunk) { // 从磁盘读文件, 读到数据出发data事件
        res.write(chunk);
    })
    readStream.on('end', function () { // 读完触发end事件
        res.end();
    });
});

server.listen(3000);