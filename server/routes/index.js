import express from 'express';

// Set the server
const server = express.Router();

// Route render for root
server.get('/', checkAuthenticated, (req, res) => {
	const host = req.hostname;
	const url = req.url;
	if (host === 'satis-track.herokuapp.com') {
		res.redirect(301, 'https://satistracker.com' + url);
	} else {
		res.render('index.ejs', {
			page_title: 'Satis Tracker'
		});
	}
});

// Check if current user is authenticated
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/users/dashboard');
	}

	next();
}

module.exports = server;
