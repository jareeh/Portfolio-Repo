const express = require('express');
const { projects } = require('./data.json');
const app = express();
const routes = require('./routes');
const projectRoutes = require('./routes/projects');

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(routes);
app.use('/projects', projectRoutes);

app.use((req, res, next) => {
	console.log('404 error handler called');
	res.status(404).render('page-not-found');
});

app.use((err, req, res, next) => {
	if (err) {
		console.log('Global error handler called');
	}
	if (err.status === 404) {
		res.status(404).render('page-not-found', { err });
	} else {
		err.message =
			err.message ||
			`Oops!  It looks like something went wrong on the server.`;
		res.status(err.status || 500).render('error', { err });
	}
});

app.listen(process.env.PORT || 3000);
