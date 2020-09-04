// Setting up the app server
const express = require('express');
const app  = express();

// Port for the server
const port = process.env.PORT || 3000;


// Static files path
app.use(express.static('public'));

// Serves the app
app.listen(port, () => {
  console.log("Running on port", port);
});