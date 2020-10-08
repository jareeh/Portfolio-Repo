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
    } else {
        const err = new Error();
        err.status = 404;
        err.message = `Looks like the project you were looking for doesn't exist.`
        next(err);
    }
});

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    // res.locals.error = err;
    // res.status = err.status;
    if(err.status === 404){
        res.render('page-not-found', { err });
        console.log('404 error called');
    } else {
        err.status = err.status || 500;
        err.message = 'Server Error'
        res.render('error', { err });
        console.log('Global error called')
    }
});

app.listen(process.env.PORT || 3000);