const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	//you can add as many arguments as you want into express. (e.g. requireLogin) requireLogin is acting as middleware to check if the user is logged in. the only requirement of express is that something handles the request. So if requireLogin handles the response then itll bypass the anonymous function.
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
