const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const shortHash = require('shorthash');

const bookmarkSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	originalURL: {
		type: String,
		required: true,
		validator: {
			validate: function(value) {
				return validator.isURL(value);
			},
			message: function() {
				return 'invalid URL';
			}
		}
	},
	tags: {
		type: [ String ],
		required: true
	},
	hashURL: {
		type: String
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
});
bookmarkSchema.pre('save', function(next) {
	let bookmark = this;
	let shortURL = shortHash.unique(bookmark.originalURl);
	if (shortURL) {
		bookmark.hashURL = shortURL;
		next();
	} else {
		console.log(err);
	}
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = {
	Bookmark
};
