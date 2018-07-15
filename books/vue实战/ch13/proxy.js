const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;
const imgPort = 8011;

const apiServer = http.createServer((req, res) => {
    const url = `http://news-at.zhihu.com/api/4${req.url}`;

    function callback(err, response, body) {
        if (!err && response.statusCode === 200) {
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(body);
        }
    }

    request.get(url, callback);
});

apiServer.listen(port, hostname, () => {
    console.log(`接口代理运行在http://${hostname}:${port}`);
})


const imgServer = http.createServer((req, res) => {
    const url = req.url.split('/img/')[1];
    const options = {
        encoding: null
    };

    function callback(err, response, body) {
        if (!err && response.statusCode === 200) {
            const contentType = response.headers['content-type'];
            res.setHeader('Content-Type', contentType);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(body);
        }
    }

    request.get(url, options, callback);
});

imgServer.listen(imgPort, hostname, () => {
    console.log(`图片代理运行在http://${hostname}:${imgPort}`);
})