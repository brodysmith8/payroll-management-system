const mysql = require ('mysql'); // Import mysql

/* I think that for the purpose of a webserver, rather than creating an 
individual connection, it would be better to have a pool connection so to allow
multiple simultaneous connections from the same pool, rather than having to operate 
on a single connection. Surely for this small of a scale it wouldn't be noticeably 
different. I do however think there is a point to be made about taking a pooling approach,
because it is more appropriate for the use case. https://www.npmjs.com/package/mysql#pooling-connections */
// const db = mysql.createConnection ({ // Create database connection
//     user: 'admin', // Database user
//     host: 'se3309.cdu9h2cspncm.us-east-1.rds.amazonaws.com', // Database host
//     database: 'se3309', // Database name
//     password: 'LPLtEQ4Sf4', // Database password
//     port: '3306' // Database port
// });

// connect to the database
// db.connect(function(err) { // Connect to database
//     if (err) throw err; // If error, throw error
//     console.log("Connected!"); // Log connected
// });

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'admin', // Database user
    host: 'se3309.cdu9h2cspncm.us-east-1.rds.amazonaws.com', // Database host
    database: 'se3309', // Database name
    password: 'LPLtEQ4Sf4', // Database password
    port: '3306' // Database port
});

module.exports = pool;