const http = require('http');

var server = http.createServer(function (req, res) {
    const body = 'Hello world.';
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/text');
    res.statusCode = 404;
    res.end(body);
});

server.listen(3000);