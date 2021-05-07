const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
const bodyParser = require('body-parser')
const server = http.createServer(app);
const { Server } = require("socket.io");
const { exchange_thbt_moon, calculateMoonRate } = require('./exchange');
const { info } = require('console');
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const moonInfo = {
    totalSold: 0,
    moonLeft: 1000,
    moonRate: 50
};

const users = new Map();

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('BaseMoon API');
});

app.post('/exchange', async (req, res) => {
    // Reach moon limit can't buy anymore
    if (moonInfo.moonLeft <= 0) {
        return res.sendStatus(403)
    }

    const date = new Date();
    const {thbtAmount, slipage, id} = req.body;
    const user = users.get(id);

    // Lock Transection
    const moonAmount = exchange_thbt_moon(thbtAmount, moonInfo.moonRate, moonInfo.totalSold);

    const transection = {
        date: date.toISOString(),
        id: date.getTime(),
        thbt: thbtAmount,
        moon: moonAmount,
        rate: {
            moonRate: moonInfo.moonRate,
            slipage: slipage,
            exchangeRate: 1 / moonInfo.moonRate
        }
    }

    // Update User
    user.thbtBalance = user.thbtBalance - thbtAmount;
    user.history.push(transection);
    users.set(user.id, user);

    // Update MOON rate
    moonInfo.totalSold = moonInfo.totalSold + moonAmount;
    moonInfo.moonLeft = moonInfo.moonLeft - moonInfo.totalSold;
    moonInfo.moonRate = calculateMoonRate(moonInfo.totalSold);

    // Update MOON rate to all users
    // Emit to specific sender
    io.emit('info', moonInfo);
    io.in(user.id).emit('user', user);

    return res.sendStatus(200); 
})

app.get('/history/:id', (req, res) => {
    const user = users.get(req.params.id);
    let history = user ? user.history : [];
    
    if (history.length) {
        // Sorting Date and Time descending
        history = history.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        });
    }

    res.json(history)
});

io.on('connection', (socket) => {
    const data = new Date();
    const user = {
        id: socket.id,
        thbtBalance: 100,
        history: []
    };
    
    socket.emit('user', user);
    socket.emit('info', moonInfo);
    users.set(socket.id, user);
    
    // Socket has disconnected, remove the user
    socket.on('disconnect', () => {
        users.delete(socket.id);
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});