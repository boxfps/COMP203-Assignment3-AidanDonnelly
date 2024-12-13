const mysql = require('mysql2')

// mysql2 package used below  to avoid username/password problems. 
// If you are having problems with mysql, use this fork instead and uncomment line 5.
// const mysql = require('mysql2') 

// Creating the connection for later usage.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'box', // change this to your username
  password: 'your_password', // change this to your password (for the record i set my password to this)
  database: 'comp206', // this must be set to comp206
  port: 3306 // port 3306 is default. if you have modified it, you should modify it here.
})

// Connecting globally to prevent having to manage connections. This is bad practice but
// shouldn't cause any problems given we only have the one user (you!)
connection.connect();

// Exporting the connection to be used elsewhere.
module.exports = connection;