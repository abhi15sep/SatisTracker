import express from 'express';

// Set the server
const server = express.Router();

// Route render for root
server.get('/', checkAuthenticated, (req, res) => {
	res.render('index.ejs', {
		page_title: 'Satis Tracker'
	});
});

// Check if current user is authenticated
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/users/dashboard');
	}

	next();
}

module.exports = server;
