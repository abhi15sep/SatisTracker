var mailer = require('nodemailer');
var CronManager = require('cron-job-manager');

let EmailNotifiers = new CronManager();

import config from '../config';

// Adds a new email notifier to the scheduler using cron-job-manager
// Use the user's ID to keep track of each job
let scheduler = (daysOfWeek, hour, userID, userEmail, username, timezone) => {
	let days = [];

	for (const day in daysOfWeek) {
		if (daysOfWeek[day] == true) {
			days.push(day.substring(0, 3));
		}
	}

	// Generate a random second value from 0-59 so that not all emails go out on the same second
	// If there are multiple users with the same work end hour, this would help keep things from going too slow
	let second = Math.floor(Math.random() * 60);

	let schedule_string = second + ' 0 ' + hour + ' * * ' + days;

	var mailOptions = {
		from: '"Satis Tracker" <satistrack@gmail.com>',
		to: userEmail,
		subject: 'Reminder to set your mood report on Satis Tracker!',
		html:
			'<div id="full_container" style="width: 100%; background-color: #EEF0F6; padding: 20px 0;">' +
			'<a href="https://satistracker.com" target="_blank" style="text-decoration: none;"><div id="logo_text" ' +
			'style="width: 100%; font-size: 30px; text-align: center; margin-bottom: 20px;">SATIS TRACKER</div></a>' +
			'<div id="content_container" style="width: 60%; background-color: #fff; margin: 20px auto; ' +
			'padding: 30px; border-radius: 10px; text-align: center; font-size: 18px; font-weight: bold;">' +
			username +
			", it's time to set your mood report on Satis Tracker.<br><br>" +
			'<a href="https://satistracker.com" target="_blank" style="text-decoration: none;"><div id="begin_button" ' +
			'style="width: fit-content; margin: 0 auto; padding: 10px 30px; border: none; background-color: #fe9079; ' +
			'color: #fff; font-size: 16px; border-radius: 5px;">Click Here To Begin</div></a></div>' +
			'<div id="statement" style="width: 100%; text-align: center; font-size: 13px; margin-top: 25px;">' +
			'This is an automated message. Please do not reply to this email.</div>' +
			'</div>'
	};

	EmailNotifiers.add(
		userID,
		schedule_string,
		async () => {
			var transporter = mailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'satistrack@gmail.com',
					pass: config.emps
				}
			});

			await transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
		},
		{ start: true, timeZone: timezone }
	);
};

// Remove a job based on the user's ID
let remove = (userID) => {
	EmailNotifiers.deleteJob(userID);
};

let start = (userID) => {
	EmailNotifiers.start(userID);
};

// Pause a job based on the user's ID
let pause = (userID) => {
	EmailNotifiers.stop(userID);
};

// Check if the user already has notifications turned on
let schedule_exists = (userID) => {
	return EmailNotifiers.exists(userID);
};

module.exports = {
	scheduler: scheduler,
	remover: remove,
	starter: start,
	pauser: pause,
	exists: schedule_exists
};
