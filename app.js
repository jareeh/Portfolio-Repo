const express = require('express');
const { projects } = require('./data.json');
const app = express();


app.set('view engine', 'pug');

app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    console.log(`Project ${req.params.id} called`);
    if(projects[req.params.id]){
        res.render('project', { project: projects[req.params.id] }); 
    }
});

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {

});



app.listen(3000, () => console.log('Listening on port 3000!'));