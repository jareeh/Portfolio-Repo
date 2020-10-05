const express = require('express');
const { projects } = require('./data.json');
const app = express();


app.set('view engine', 'pug');

app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
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
    res.locals.error = err;
    res.status = err.status;
    if(err.status === 404){
        res.render('page-not-found', { err });
    } else {
        err.message = 'Server Error'
        res.render('error', { err });
    }
});

app.listen(3000);