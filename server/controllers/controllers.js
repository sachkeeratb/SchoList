// Get the user model
const User = require('../models/User');

// Get the contact model
const Contact = require('../models/Contact');

// Get the password hashing
const { hashPassword, comparePassword } = require('../helpers/auth');

// Get the web token
const WebToken = require('../node_modules/jsonwebtoken');

// Signup Endpoint
const signupUser = async (req, res) => {
	try {
		// Store the information
		const { name, email, password } = req.body;

		// Check if name was entered
		if (!name) {
			return res.json({
				error: 'An organizational name is required.',
			});
		}

		// Check if email is valid
		if (!email) {
			return res.json({
				error: 'An email is required.',
			});
		}

		// Check if the user is already signed up
		const exists = await User.findOne({ email });
		if (exists) {
			return res.json({
				error: 'Email is taken.',
			});
		}

		// Check if password is valid
		if (!password || password.length <= 6) {
			return res.json({
				error: 'A password longer than 6 characters is required.',
			});
		}

		// Get the hashed password
		const hashedPass = await hashPassword(password);

		// Create the user
		const createUser = await User.create({
			name,
			email,
			password: hashedPass,
		});

		// Return the user
		return res.json(createUser);
	} catch (error) {
		console.log(error);
	}
};

// Login endpoint
const loginUser = async (req, res) => {
	try {
		//Store the information
		const { email, password } = req.body;

		// Check if the user exists
		const logUser = await User.findOne({ email });
		if (!logUser) {
			return res.json({
				error: 'No user found.',
			});
		}

		// Check if there is a password
		if (!password) {
			return res.json({
				error: 'A password is required.',
			});
		}

		// Check if the passwords match
		const match = await comparePassword(password, logUser.password);
		if (match) {
			// Sign the webtoken
			WebToken.sign(
				{
					id: logUser._id,
					email: logUser.email,
					name: logUser.name,
				},
				process.env.WEBTOKEN_SECRET,
				{},
				(error, token) => {
					if (error) throw error;
					res.cookie('token', token).json(logUser);
				}
			);
		}

		// If the passwords don't match
		if (!match) {
			return res.json({
				error: 'Incorrect password.',
			});
		}
	} catch (error) {
		console.log(error);
	}
};

// Profile Endpoint
const getProfile = (req, res) => {
	// Get the user's token
	const { token } = req.cookies;

	// If the user has a token, give the profile
	if (token) {
		WebToken.verify(token, process.env.WEBTOKEN_SECRET, {}, (error, user) => {
			if (error) throw error;
			res.json(user);
		});
	} else {
		// Else, return null, signifying that there is no user logged in
		res.json(null);
	}
};

// Account deletion endpoint
const deleteAccount = async (req, res) => {
	// Get the user's id
	const userID = req.params.id;

	try {
		// Delete the user by finding their id
		const deletedUser = await User.findByIdAndDelete(userID);

		// If the user was not deleted, the account was not found
		if (!deletedUser) {
			return res.json({
				error: 'Account not found.',
			});
		}

		// Delete the cookie
		res.cookie('token', null, {
			expires: new Date(Date.now()),
			httpOnly: true,
		});

		// Inform the user that their account was deleted successfully
		return res.json({
			message: 'Account deleted successfully.',
			user: deletedUser,
		});
	} catch (error) {
		console.log(error);
	}
};

// User update endpoint
const updateAccount = async (req, res) => {
	const id = req.params.id;

	// Get the hashed password
	const hashedPass = await hashPassword(req.body.password);

	try {
		// Update the user
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				name: req.body.name,
				email: req.body.email,
				password: hashedPass,
			},
			{ new: true }
		);

		// Return a message and the updated user
		return res.json({
			message: 'User updated successfully!',
			updatedUser,
		});
	} catch (error) {
		console.log(error);
	}
};

// Contact creation endpoint
const createContact = async (req, res) => {
	// Get the user's id
	const userId = req.params.id;
	try {
		// Create the contact
		const newContact = await Contact.create(req.body);

		// Return the new contact with a good message
		return res.json({
			message: 'Contact created successfully!',
			newContact,
		});
	} catch (error) {
		console.log(error);
	}
};

// All contacts fetching endpoint
const getContacts = async (req, res) => {
	try {
		// Get all the contacts
		const allContacts = await Contact.find({});

		// Return the contacts
		return res.json(allContacts);
	} catch (error) {
		console.log(error);
	}
};

// Singular contact fetching endpoint
const getContact = async (req, res) => {
	// Get the contact's id
	const id = req.params.id;
	try {
		// Get the contact through it's id
		const contact = await Contact.findById(id);

		// Return the contact
		return res.json(contact);
	} catch (error) {
		console.log(error);
	}
};

// Update contact endpoint
const updateContact = async (req, res) => {
	// Get the contact's id
	const id = req.params.id;
	try {
		// Update the contact with its new info
		const updatedContact = await Contact.findByIdAndUpdate(id, req.body);

		// Return a success message with the updated contact
		return res.json({
			message: 'Contact updated successfully!',
			updatedContact,
		});
	} catch (error) {
		console.log(error);
	}
};

// Delete contact endpoint
const deleteContact = async (req, res) => {
	// Get the contact's id
	const id = req.params.id;

	try {
		// Delete the contact from their id
		await Contact.findByIdAndDelete(id);

		// Return a success message
		return res.json({
			message: 'Contact successfully deleted.',
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error: 'Unable to delete contact.',
		});
	}
};

// Export all endpoints
module.exports = {
	signupUser,
	loginUser,
	getProfile,
	deleteAccount,
	updateAccount,
	createContact,
	getContacts,
	getContact,
	updateContact,
	deleteContact,
};
