const mysql = require('mysql2')
const connection = mysql.createConnection({
// also I did this whole assignment on Linux so sorry if stuff doesnt work 
// i know this is insanely unsafe but it is sadly the only way i an get it working
// please dont steal my stuff :) also this is a fake password for the record
  host: 'localhost',
  user: 'box',
  password: 'your_password',
  database: 'COMP206'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

module.exports = connection;