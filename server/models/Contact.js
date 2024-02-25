// To create a contact model
const mongoose = require('mongoose');

// Schema class
const { Schema } = mongoose;

// Create a contact schema
// Personal information, organization information, a description, if they are favourited by the user, and the ID of the user that created them
const ContactSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		phoneNum: {
			type: Number,
			unique: true,
			require: true,
		},
		birth: {
			type: Date,
		},
		org: {
			type: String,
			required: true,
		},
		orgType: {
			type: Boolean,
			required: true,
		},
		resourcesAvailable: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		favourite: {
			type: Boolean,
		},
		image: {
			type: String,
		},
		userID: {
			type: String,
		},
	},
	{ collection: 'contacts' }
);

// Create the contact model
const ContactModel = mongoose.model('Contact', ContactSchema);

// Export the contact model and its validation function
module.exports = ContactModel;
