const WebSocketServer = require('ws').Server;

module.exports = class WSServer {
    private wss: typeof WebSocketServer;
    private port: number;

    public create() {
        this.wss = new WebSocketServer({ port: this.port });

        this.wss.on('connection', function (ws) {

            console.log(`client connected ${this.port}`);

            ws.on('message', function (message) {
                console.log(message);
            });

            this.wss.on('close', () => {
                console.log('WS Server Was Closed!');
            });
        });
    }

    public close() {
        delete this.wss;
    }

    public constructor(port: number){
        this.port = port
    }
}