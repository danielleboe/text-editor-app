const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client directory
app.use(express.static('client'));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use routes
require('./client/server/routes/htmlRoutes')(app);

// Start the server
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
