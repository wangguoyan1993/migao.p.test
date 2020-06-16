const http = require('http');
const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('Hello World!\n' + 'local-server.js');
});

server.on('request', (req, res) => {
    console.log('-- 本地服务创建成功: htto://localhost:3000');

    res.writeHead(200, {'Content-Type': 'text/plain;chartset=utf-8'});
    res.write('收到请求');
    res.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/`1.1 400 Bat Request\r\n\r\n');
});

server.on('close', () => {
    console.log('-- 本地服务已关闭');
});

server.on('connection', () => {
    console.log('-- 本地服务已连接');
});

server.on('error', (error) => {
    console.log(`-- 本地服务异常: ${error}`);
});

server.listen(port, () => {
    console.log(`-- 本地服务正在运行： http://${hostname}:${port}/`);
});

