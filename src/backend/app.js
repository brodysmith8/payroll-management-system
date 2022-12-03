const express = require('express'); // Import express
const bodyParser = require ('body-parser'); // Import body-parser
const pool = require('./pool.js')
const employee = require('./routes/employee.js'); // pass app as a parameter so we can use pool there
const branch = require('./routes/branch.js');
const app = express(); // Create express app

// Config
app.use(bodyParser.urlencoded({extended: false})); // Use body-parser
app.use(bodyParser.json()); // Use body-parser

/* VERY cool: anywhere that we pass the Express app object gets the mySQL pool too 
from https://qr.ae/prRRAM */
app.set('pool', pool); 

module.exports = app; // Export app

// Feature One, Two, Three
app.user('/api/employee', employee);

// Feature Four, Five
app.get('/api/branch', branch);

// Listen

const port = process.env.PORT || 3000; // Set port

app.listen(port, () => { // Listen on port 3000
    console.log(`Listening on port ${port}...`); // Log to console
});