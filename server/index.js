// Import express.js for get, post, etc. requests
const express = require('./node_modules/express');

// Import and configure DotENV
const dotenv = require('dotenv').config();

// Import cors
const cors = require('./node_modules/cors');

// Import mongoose as I am using MongoDB
const { mongoose } = require('mongoose');

// Import Cookie Parser for the cookies and tokens
const CookieParser = require('./node_modules/cookie-parser');

// For images
const multer = require('./node_modules/multer');
const path = require('path');

// Initialize express
const app = express();

// Connect the database
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('Database connected.'))
	.catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(CookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));

// Upload the picture
app.use('/upload', express.static(path.join(__dirname, '/upload')));

// Upload the picture to the local place to store it
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './upload');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// Upload the image and send a success message
const upload = multer({ storage: storage });
app.post('/contact/upload', upload.single('file'), (req, res) => {
	return res.json({
		message: 'Image uploaded successfully!',
	});
});

// To use all the routes given in routes.js
app.use('/', require('./routes/routes'));

// To tell us that the server has started
app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${process.env.PORT}.`)
);
