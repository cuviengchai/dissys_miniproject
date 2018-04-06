var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	uid: Schema.ObjectId,
	uname: String,
	username: String,
	password: String,
});
module.exports = User = mongoose.model('User', UserSchema);