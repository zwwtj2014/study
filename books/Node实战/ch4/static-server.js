const http = require('http');
const parse = require('url').parse;
const join = require('path').join;
const fs = require('fs');

const root = __dirname;

const server = http.createServer(function (req, res) {
    const url = parse(req.url);
    const path = join(root, url.pathname);
    fs.stat(path, (err, stats) => {
        if (err) {
            if ('ENOENT' === err.code) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }
        res.setHeader('Content-Length', stats.size);
        const readStream = fs.createReadStream(path); // 创建一个从磁盘读取文件的流
        readStream.pipe(res);
        readStream.on('error', function (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
    });
});

server.listen(3000);