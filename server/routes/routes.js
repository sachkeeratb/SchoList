// Import expres.js and cors for the router and middleware
const express = require('express');
const cors = require('cors');

// Get the controller endpoints
const {
	test,
	signupUser,
	loginUser,
	getProfile,
	deleteAccount,
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

// Connect the endpoints with their locations
router.get('/', test);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.delete('/delete/:id', deleteAccount);

// Export the router
module.exports = router;
