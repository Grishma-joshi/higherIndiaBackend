// // Import necessary modules
// const { Client } = require('pg');

// // PostgreSQL connection URI
// const connectionString = 'postgresql://customer_dashboard_user:LZuKobHgcEP1q69mxnC2Pj5NF7e7hAT8@dpg-cqfoijd6l47c73bifd2g-a/customer_dashboard';

// // Create a new client instance using the connection URI
// const client = new Client({
//   connectionString: connectionString
// });

// // Connect to the PostgreSQL database
// client.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL');
    
//     // Example: Querying the database
//     client.query('SELECT NOW() as current_time')
//       .then(result => {
//         console.log('Current time from PostgreSQL:', result.rows[0].current_time);
//       })
//       .catch(err => {
//         console.error('Error executing query:', err.stack);
//         client.end(); // Close the client connection on error
//       });
//   })
//   .catch(err => {
//     console.error('Connection error', err.stack);
//     client.end(); // Close the client connection on error
//   });


// // config.js
module.exports = {
  database: {
    connectionString: 'postgresql://consumer_dashboard_user:DqTTmd7xeQ7t0T6wftQ0Pb5LhEJUWhWb@dpg-cqfphpqju9rs73c1n7c0-a/consumer_dashboard',
    ssl: {
      rejectUnauthorized: false
    }
  }
};
