const { Client } = require('pg');

// Create a client to connect to the default 'postgres' database
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'new_password',
  port: 5432, // default PostgreSQL port
});

client.connect()
  .then(() => {
    return client.query('CREATE DATABASE admin_customer');
  })
  .then(() => {
    console.log('Database created successfully');
  })
  .catch(err => {
    console.error('Error creating database', err);
  })
  .finally(() => {
    client.end();
  });
