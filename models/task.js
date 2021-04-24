var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	task: String,
	completed: Boolean
},{ timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
