const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors')
const bodyParser = require('body-parser')
const server = http.createServer(app);
const users = new Map();
const { Server } = require("socket.io");
const { exchange_thbt_moon, calculateMoonRate, exchange_moon_thbt } = require('./exchange');
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const moonInfo = {
    totalSold: 0,
    moonLeft: 1000,
    moonRate: 50,
    history: []
};

app.use(cors())

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('BaseMoon API');
});

app.post('/exchange', async (req, res) => {
    const { thbtAmount, slipage, id } = req.body;
    const user = users.get(id);
    
    if (moonInfo.moonLeft <= 0) {
        return res.status(403).send("Moon coin reach limit!")
    }
    
    if (!user) {
        return res.status(403).send('User not found')
    }
    
    if (user.thbtBalance <= 0 || user.thbtBalance < thbtAmount) {
        return res.status(403).send('User not enough thbt balance')
    }
    
    // Lock Transection
    const date = new Date();
    const coin = exchange_thbt_moon(thbtAmount, moonInfo.moonRate, moonInfo.totalSold);

    if (coin > moonInfo.moonLeft) {
        return res.status(401).send("Moon coin more then moon limit!");
    }

    // Update Moon Rate
    moonInfo.moonLeft = moonInfo.moonLeft - coin;
    moonInfo.totalSold = moonInfo.totalSold + coin;
    moonInfo.moonRate = calculateMoonRate(moonInfo.totalSold);
    
    const transection = {
        date: date.toISOString(),
        id: user.id,
        thbt: thbtAmount,
        moon: coin,
        rate: {
            moonRate: moonInfo.moonRate,
            slipage: slipage,
            exchangeRate: 1 / moonInfo.moonRate
        }
    }
    
    // Log buy history
    moonInfo.history.unshift(transection);

    // Update User
    user.thbtBalance = user.thbtBalance - thbtAmount;
    users.set(user.id, user);

    // Emit Moon rate realtime
    io.emit('info', moonInfo);
    io.in(user.id).emit('user', user);

    return res.sendStatus(200); 
})

app.get('/ask', (req, res) => {
    const moon = +req.query.moon || 0;
    const thbt = +req.query.thbt || 0;
    let totalThbt = 0
    let totalMoon = 0

    if (moon > 0) {
        totalMoon = moon;
        totalThbt = exchange_moon_thbt(moon, moonInfo.moonRate, moonInfo.totalSold);
    }

    if (thbt > 0) {
        totalThbt = thbt;
        totalMoon = exchange_thbt_moon(thbt, moonInfo.moonRate, moonInfo.totalSold);
    }

    res.send({ moon: totalMoon, thbt: totalThbt })
});

io.on('connection', (socket) => {
    const data = new Date();
    const user = {
        id: socket.id,
        thbtBalance: 100
    };
    
    socket.emit('user', user);
    socket.emit('info', moonInfo);
    users.set(socket.id, user);
    
    // Socket has disconnected, remove the user
    socket.on('disconnect', () => {
        users.delete(socket.id);
    })
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});