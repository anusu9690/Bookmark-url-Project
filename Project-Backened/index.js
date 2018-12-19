const express = require('express');
const app = express();
const { Bookmark } = require('./app/models/bookmark');
const { mongoose } = require('./config/db');
const { bookmarksController } = require('./app/controllers/bookmarksController');
const port = 3000;

app.use(express.json());

app.get('/', function(req, res) {
	res.send('welcome to the site');
});

app.use('/bookmarks', bookmarksController);
app.get('/:hash', (req, res) => {
	let hash = req.params.hash;
	console.log(hash);
	Bookmark.findOne({ hashURL: hash })
		.then((Bookmark) => {
			res.redirect(Bookmark.originalURL);
		})
		.catch((err) => {
			res.send(err);
		});
});

app.listen(port, function() {
	console.log('listening on port', port);
});

module.exports = {
	Bookmark
};
