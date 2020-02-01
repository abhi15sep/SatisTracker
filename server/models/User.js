import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	joindate: {
		type: Date
	},
	user_timezone: {
		type: String
	},
	allow_email_notifier: {
		type: Boolean,
		default: false
	},
	confirmation_code: {
		type: String,
		required: true
	},
	email_confirmed: {
		type: Boolean,
		default: false
	},
	work_start_hour: {
		type: Number,
		default: 9,
		required: false
	},
	work_end_hour: {
		type: Number,
		default: 17,
		required: false
	},
	work_days: {
		type: Object,
		default: {
			sunday: 'false',
			monday: 'true',
			tuesday: 'true',
			wednesday: 'true',
			thursday: 'true',
			friday: 'true',
			saturday: 'false'
		},
		required: false
	},
	first_satis_report: {
		type: String,
		default: '12/01/1970'
	},
	last_schedule_edit: {
		type: String,
		default: '12/01/1970'
	},
	last_report_date: {
		type: String,
		default: '12/01/1970'
	},
	days_reported: {
		type: Number,
		default: 0,
		required: false
	},
	reporting_streak: {
		type: Number,
		default: 0,
		required: false
	},
	total_streaks: {
		type: Number,
		default: 0,
		required: false
	},
	company: {
		type: String,
		default: '',
		required: false
	},
	private: {
		type: Number,
		default: 0
	}
});

const User = mongoose.model('User', UserSchema);

export default User;
