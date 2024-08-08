const { Client } = require('pg');
const config = require('./config');

const createTablesQuery = `
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS customers;

   CREATE TABLE IF NOT EXISTS customers (
      customer_id SERIAL PRIMARY KEY,
      customer_name VARCHAR(100) NOT NULL,
      gst_number VARCHAR(15) UNIQUE,
      landline_num VARCHAR(15) UNIQUE,
      email_id VARCHAR(100) UNIQUE,
      pan_no VARCHAR(10) UNIQUE,
      tan_number VARCHAR(15) UNIQUE,
      address TEXT,
      city VARCHAR(50),
      state VARCHAR(50),
      country VARCHAR(50),
      pincode VARCHAR(10),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      contact_id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
      contact_person VARCHAR(100) NOT NULL,
      phone_num VARCHAR(15) UNIQUE,
      email_id VARCHAR(100) UNIQUE,
      address TEXT,
      city VARCHAR(50),
      state VARCHAR(50),
      country VARCHAR(50),
      pincode VARCHAR(10),
      department VARCHAR(100),
      designation VARCHAR(100),
      date_of_start DATE,
      date_of_end DATE,
      status VARCHAR(10) CHECK (status IN ('active', 'inactive')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const client = new Client(config.database);

client.connect()
  .then(() => client.query(createTablesQuery))
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch(err => {
    console.error('Error creating tables:', err);
  })
  .finally(() => {
    client.end();
  });
