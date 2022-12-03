const express = require ('express'); // Import express
const app = express(); // Create express app
const bodyParser = require ('body-parser'); // Import body-parser

app.use(bodyParser.urlencoded({extended: false})); // Use body-parser
app.use(bodyParser.json()); // Use body-parser

module.exports = app; // Export app

const port = process.env.PORT || 3000; // Set port

app.listen(port, () => { // Listen on port 3000
    console.log(`Listening on port ${port}...`); // Log to console
});


