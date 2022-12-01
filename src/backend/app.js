const express = require ('express'); // Import express
const app = express(); // Create express app
const bodyParser = require ('body-parser'); // Import body-parser
const mysql = require ('mysql'); // Import mysql


app.use(bodyParser.urlencoded({extended: false})); // Use body-parser
app.use(bodyParser.json()); // Use body-parser

module.exports = app; // Export app

const db = mysql.createConnection ({ // Create database connection

    user: 'admin', // Database user
    host: 'se3309.cdu9h2cspncm.us-east-1.rds.amazonaws.com', // Database host
    database: 'se3309', // Database name
    password: 'LPLtEQ4Sf4', // Database password
    port: '3306' // Database port


});

// connect to the database
db.connect(function(err) { // Connect to database
    if (err) throw err; // If error, throw error
    console.log("Connected!"); // Log connected
});


const port = process.env.PORT || 3000; // Set port

app.listen(port, () => { // Listen on port 3000
    console.log(`Listening on port ${port}...`); // Log to console
});


