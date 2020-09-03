const path = require('path');
const express = require('express');
const app = express();
const directory = path.join(__dirname, '..');
const port = process.env.PORT || 3000;

app.use(express.static(`${directory}/build`));

app.get('/', (req, res) => {
	res.sendFile(path.join(`${directory}/build`, 'index.html'));
});

app.get('/docs', (req, res) => {
	res.sendFile(path.join(`${directory}/public/docs`, 'index.html'));
});

app.listen(port, () => {
	console.log('Server is up!');
});
