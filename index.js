const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();
let apiRouter = require('./apis/parks');
let parkService = require('./data/park-service');
let performanceMiddleware = require('./middleware/performance');
let expressWs = require('express-ws')(app);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(performanceMiddleware);
app.use(bodyParser({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let amusementParks;
parkService.get().then(parks => amusementParks = parks);

app.use('/api/parks', apiRouter);

let clients = [];
let messages = [];
app.ws('/chat', function (ws, req) {
    clients.push(ws);

    messages.forEach(m => ws.send(m));

    ws.on('message', function (msg) {
        messages.push(msg);
        clients.forEach(c => c.send(msg));
    });
    ws.on('close', () => {
        clients.splice(clients.indexOf(ws), 1);
    });
});

app.get('/test', (req, res, next) => {
    fs.readFile('packagsdsadsade.json', 'utf8', (err, content) => {
        if (err) {
            next(err);
            return;
        }
        res.send('alles ging prima blijkbaar');
    });
});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'wauw ongelofelijk',
        amusementParks: amusementParks
    });
});
app.post('/save', (req, res) => {
    amusementParks.push(req.body);
    res.render('save');
});

app.use((err, req, res, next) => {
    console.log('error:', err);
    res.send('Er ging iets stuk. Erg vervelend.');
});
app.listen(1337);