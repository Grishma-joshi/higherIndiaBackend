// Import necessary modules
const { Client } = require('pg');

// PostgreSQL connection URI
const connectionString = 'postgresql://higherindia_user:MG4SB8t10U2XDt41WU0zI4qbKKpLBWuA@dpg-cqd4o9bv2p9s73e7lgsg-a.singapore-postgres.render.com/higherindia';

// Create a new client instance using the connection URI
const client = new Client({
  connectionString: connectionString
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    
    // Example: Querying the database
    client.query('SELECT NOW() as current_time')
      .then(result => {
        console.log('Current time from PostgreSQL:', result.rows[0].current_time);
      })
      .catch(err => {
        console.error('Error executing query:', err.stack);
        client.end(); // Close the client connection on error
      });
  })
  .catch(err => {
    console.error('Connection error', err.stack);
    client.end(); // Close the client connection on error
  });


// // config.js
// module.exports = {
//   database: {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'new_password',
//     database: 'postgres',
//     port: 5432, // Default port for PostgreSQL
//   },
// };
