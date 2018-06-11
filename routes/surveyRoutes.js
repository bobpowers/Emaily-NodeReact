const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thank you for your feedback!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		//.chain() starts lodash chain that automatically moves all returned values to the next method down the line and returns all to 'events' with .value()...
		//.compact() removes all instances of 'undefined' - i.e. all click events that dont fit the parameters we're looking for that were removed and replaced with 'undefined'.
		//.uniqBy() removes duplicate responses based on email and survey Id. this means the same user can respond to multiple campaigns at the same time but cant send multiple responses to the same campaign.

		const events = _.chain(req.body)
			.map(({ email, url }) => {
				//Path will take :surveyId and :choice and return an object with these assigned as the keys within 'p' that holds the values for where the client navigated to (the specific survey id and a yes or no)
				const p = new Path('/api/surveys/:surveyId/:choice');
				const match = p.test(new URL(url).pathname);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.value();
		console.log(events);

		res.send({});
	});
	//the anonymous function is async so that we can push to mongo after the emails have been sent
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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
		//Send the email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
