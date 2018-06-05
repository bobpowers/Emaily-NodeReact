const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;
		//wrap the email (in map function) in parenthesis to return an object so the function wont confuse it as function brackets
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});
	});
};
