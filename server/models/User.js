// To create a user model
const mongoose = require('mongoose');

// Schema class
const { Schema } = mongoose;

// Create a user schema, with a unique name, unique email, and password
const UserSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: String,
	},
	{ collection: 'users' }
);

// Create the user model
const UserModel = mongoose.model('User', UserSchema);

// Export the user model
module.exports = UserModel;
