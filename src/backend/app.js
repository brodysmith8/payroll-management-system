const express = require('express'); // Import express
const cors = require('cors');
const bodyParser = require ('body-parser'); // Import body-parser
const pool = require('./pool.js');
const employee = require('./routes/employee'); // pass app as a parameter so we can use pool there
const branch = require('./routes/branch');
const app = express(); // Create express app

// Config
app.use(bodyParser.urlencoded({extended: false})); // Use body-parser
app.use(bodyParser.json()); // Use body-parser
app.use(cors());

/* VERY cool: anywhere that we pass the Express app object gets the mySQL pool too 
from https://qr.ae/prRRAM */
app.set('pool', pool); 

module.exports = app; // Export app

app.get('/api/', (req, res) => {
    res.send("hey!");
});

// Feature One, Two, Three
app.use('/api/employee', employee);

// Feature Four, Five
app.use('/api/branch', branch);

// Listen

const port = process.env.PORT || 3000; // Set port

app.listen(port, () => { // Listen on port 3000
    console.log(`Listening on port ${port}...`); // Log to console
});