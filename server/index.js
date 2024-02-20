// Import express.js for get, post, etc. requests 
const express = require('./node_modules/express');

// Import and configure DotENV
const dotenv = require('dotenv').config()

// Import cors
const cors = require('./node_modules/cors')

// Import mongoose as I am using MongoDB
const { mongoose } = require('mongoose');

// Import Cookie Parser for the cookies and tokens
const CookieParser = require('./node_modules/cookie-parser')


// Initialize express
const app = express();

// Connect the database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected."))
.catch((err) => console.log(err))

// Middleware
app.use(express.json())
app.use(CookieParser())
app.use(express.urlencoded({extended: false}))

// To use all the routes given in routes.js
app.use('/', require('./routes/routes'))

// To tell us that the server has started
const port = 8000;
app.listen(port, () =>
  console.log(`Server started on port ${port}.`)
)