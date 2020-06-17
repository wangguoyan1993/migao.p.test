const socketIO = require('socket.io');
const SOCKET_PORT = 8100;

module.exports = (server: any) => {
    // 创建socket服务
    const io = socketIO(server);

    io.on('connection', (client: { om: (arg0: string, arg1: (data: any) => void) => void; on: (arg0: string, arg1: () => void) => void; }) => {
        console.log(`GUI服务socket已启动: ${port}`);

        client.om('event', (data: any) => {
            console.log(data);

            switch (data) {
                case 'test':
                    alert(1);
                    console.log('test');
                    break;
                default:
                    break;
            }
        });

        client.on('disconnect', () => {
            console.log(`GUI服务socket已失去连接`);
        });
    });

    io.listen(8100);
}