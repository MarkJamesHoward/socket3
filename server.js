const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {

    client.on('TankPosition', (msg) => {
        console.log('Message Received: ' + msg)
    })

    client.on('disconnect', () => {
        console.log('client disconnected')

    })
})

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 1337;
console.log(port)
server.listen(port)


