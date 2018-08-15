// First, install express and Joi on the application at the command line.  Then call them and initialize an instance of express.
const express = require('express');
const app = express();
const Joi = require('Joi');
const genres = require('./routes/genres');

// to allow json parsing, let our app use it.
app.use(express.json());
app.use('http://vidly.com/api/genres', genres);

// set-up the listener and port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
