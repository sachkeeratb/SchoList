// Create the user
const User = require('../models/User');

// Get the password hashing
const { hashPassword, comparePassword } = require('../helpers/auth');

// Get the web token
const WebToken = require('../node_modules/jsonwebtoken');

// Testing endpoint
const test = (req, res) => {
	res.json('Test works!');
};

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
		const user = await User.create({
			name,
			email,
			password: hashedPass,
		});

		// Return the user
		return res.json(user);
	} catch (error) {
		/* Ignore if there are any errors */
	}
};

// Login endpoint
const loginUser = async (req, res) => {
	try {
		//Store the information
		const { email, password } = req.body;

		// Check if the user exists
		const user = await User.findOne({ email });
		if (!user) {
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
		const match = await comparePassword(password, user.password);
		if (match) {
			// Sign the webtoken
			WebToken.sign(
				{
					id: user._id,
					email: user.email,
					name: user.name,
				},
				process.env.WEBTOKEN_SECRET,
				{},
				(error, token) => {
					if (error) throw error;
					res.cookie('token', token).json(user);
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
		/* Ignore if there are any errors */
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
		/* Ignore if there are any errors */
	}
};

// Export all endpoints
module.exports = {
	test,
	signupUser,
	loginUser,
	getProfile,
	deleteAccount,
};
