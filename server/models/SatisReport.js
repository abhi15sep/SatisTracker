import mongoose from 'mongoose';

const SatisReportSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	mood: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	month: {
		type: Number,
		required: true
	},
	day: {
		type: Number,
		required: true
	},
	day_word: {
		type: String,
		required: true
	},
	recap: {
		type: String,
		required: false
	},
	year: {
		type: Number,
		required: true
	}
});

const SatisReport = mongoose.model('SatisReport', SatisReportSchema);

export default SatisReport;
