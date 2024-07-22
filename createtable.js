const { Client } = require('pg');
const config = require('./config'); // Import the configuration

const createTableQuery = `
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    gst_number VARCHAR(15),
    landline_num VARCHAR(15),
    address TEXT,
    email_id VARCHAR(100),
    pan_no VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createContactsTableQuery = `
CREATE TABLE IF NOT EXISTS contacts (
    contact_id SERIAL PRIMARY KEY,
    contact_person VARCHAR(100) NOT NULL,
    phone_num VARCHAR(15),
    email_id VARCHAR(100),
    address TEXT,
    country VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const client = new Client(config.database);

client.connect()
  .then(() => client.query(createTableQuery))
  .then(() => {
    console.log('Customers table created successfully');
    return client.query(createContactsTableQuery);
  })
  .then(() => {
    console.log('Contacts table created successfully');
  })
  .catch((err) => {
    console.error('Error creating tables', err);
  })
  .finally(() => {
    client.end();
  });

