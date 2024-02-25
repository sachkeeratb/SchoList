// To encrypt the user's password
const bcrypt = require('../node_modules/bcrypt');

// Hash the password
const hashPassword = (password) => {
	// Return a promise
	return new Promise((resolve, reject) => {
		// Generate the encryption with a level of 12 (default is 10)
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err);
			}

			// Hash the password
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err);
				}
				resolve(hash);
			});
		});
	});
};

// To compare the password with the hashed password
const comparePassword = (password, hashPass) => {
	// Decrypt the password, compare, and return a boolean value
	return bcrypt.compare(password, hashPass);
};

// Export the functions
module.exports = {
	hashPassword,
	comparePassword,
};
