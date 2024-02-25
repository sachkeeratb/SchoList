// Import expres.js and cors for the router and middleware
const express = require('express');
const cors = require('cors');

// Get the controller endpoints
const {
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
} = require('../controllers/controllers');

// Create the router
const router = express.Router();

// Middleware
router.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);

// Connect the user endpoints with their locations
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.delete('/delete/:id', deleteAccount);
router.put('/update/:id', updateAccount);

// Connect the contact endpoints with their locations
router.post('/contact/create', createContact);
router.get('/contact/get', getContacts);
router.get('/contact/get/:id', getContact);
router.put('/contact/update/:id', updateContact);
router.delete('/contact/delete/:id', deleteContact);

// Export the router
module.exports = router;
