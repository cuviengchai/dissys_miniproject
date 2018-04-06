var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
	id: Schema.ObjectId,
	name: String,
});
module.exports = Group = mongoose.model('Group', GroupSchema);