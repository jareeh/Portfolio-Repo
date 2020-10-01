const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});





app.listen(3000, () => console.log('Listening on port 3000!'));