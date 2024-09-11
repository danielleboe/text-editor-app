const express = require('express');

const app = express();
const PORT = process.env.PORT || 9000;

// Serve static files from the client directory
app.use(express.static('client/dist'));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use routes
require('./server/routes/htmlRoutes.js')(app);

// Start the server
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
