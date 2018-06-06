const http = require('http');
const url = require('url');

let items = [];
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            let item = '';
            req.setEncoding('utf-8');
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function () {
                items.push(item);
                res.end('OK');
            });
            break;
        case 'GET':
            var body = items.map((item, i) => {
                return i + ')' + item;
            }).join('\n');
            res.setHeader('Content-Length', body.length);
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
        default:
            break;
    }

});

server.listen(3000);