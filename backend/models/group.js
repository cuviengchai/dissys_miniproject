var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
	gid: Schema.ObjectId,
	gname: String,
});
module.exports = Group = mongoose.model('Group', GroupSchema);