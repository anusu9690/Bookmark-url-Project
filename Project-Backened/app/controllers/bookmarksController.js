const express = require('express');
const router = express.Router();

const { Bookmark } = require('../models/bookmark');
const { validateId } = require('../middlewares/bookmarkValidation');

router.get('/', function(req, res) {
	Bookmark.find()
		.then(function(bookmarks) {
			res.send(bookmarks);
		})
		.catch(function(err) {
			res.send(err);
		});
});

router.get('/:id', validateId, function(req, res) {
	let id = req.params.id;
	Bookmark.findById(id)
		.then(function(bookmark) {
			res.send(bookmark);
		})
		.catch(function(err) {
			res.send(err);
		});
});

router.get('/tags/', (req, res) => {
	let names = req.query.names;
	names = names.split(',');
	console.log(names);
	Bookmark.find({ tags: { $in: [ names[0], names[1] ] } })
		.then((bookmark) => {
			if (bookmark.length > 0) {
				res.send(bookmark);
			} else {
				res.send({
					notice: 'invalid tag name'
				});
			}
		})
		.catch((err) => {
			res.send(err);
		});
});

router.post('/', function(req, res) {
	let body = req.body;
	let book = new Bookmark(body);
	book
		.save()
		.then(function(bookmark) {
			// console.log(bookmark);
			res.send(bookmark);
		})
		.catch(function(err) {
			res.send(err);
		});
});

router.put('/:id', validateId, function(req, res) {
	let id = req.params.id;
	let body = req.body;
	Bookmark.findByIdAndUpdate(id, { $set: body }, { new: true })
		.then(function(bookmark) {
			res.send(bookmark);
		})
		.catch(function(err) {
			res.send(err);
		});
});

router.delete('/:id', validateId, function(req, res) {
	let id = req.params.id;
	Bookmark.findByIdAndDelete(id)
		.then(function(bookmark) {
			res.send({
				notice: 'successfully deleted the bookamrk'
			});
		})
		.catch(function(err) {
			res.send(err);
		});
});

module.exports = {
	bookmarksController: router
};
