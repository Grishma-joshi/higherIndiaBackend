const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL database connection configuration
const client = new Client({
  connectionString: 'postgresql://higherindia_user:MG4SB8t10U2XDt41WU0zI4qbKKpLBWuA@dpg-cqd4o9bv2p9s73e7lgsg-a/higherindia',
  ssl: {
    rejectUnauthorized: false // Necessary for some hosted services that use SSL
  }
});

// Connect to PostgreSQL database and create table if it doesn't exist
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    return createTableIfNotExists();
  })
  .catch(err => console.error('Connection error', err.stack));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create the customers table if it doesn't exist
const createTablesQuery = `
-- Drop tables if they already exist
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    GSTNO VARCHAR(15),
    landline_num VARCHAR(15),
    address TEXT,
    email_id VARCHAR(100),
    pan_no VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

client.connect()
  .then(() => client.query(createTablesQuery))
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch(err => {
    console.error('Error creating tables', err);
  })
  .finally(() => {
    client.end();
  });

// Create a new customer
app.post('/customers', (req, res) => {
  const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;

  // Validate input
  if (!customer_name || !gst_number || !landline_num || !address || !email_id || !pan_no) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO customers (customer_name, gst_number, landline_num, address, email_id, pan_no)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [customer_name, gst_number, landline_num, address, email_id, pan_no];

  client.query(query, values)
    .then(result => {
      const newCustomer = result.rows[0];
      res.status(201).json({
        message: 'Customer created successfully',
        customer: newCustomer
      });
    })
    .catch(err => {
      console.error('Error inserting customer:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Get all customers
app.get('/all-customers', (req, res) => {
  client.query('SELECT * FROM customers')
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error fetching customers:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Get a customer by ID
app.get('/customers/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM customers WHERE customer_id = $1', [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    })
    .catch(err => {
      console.error('Error fetching customer:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update a customer by ID
app.put('/customers/:id', (req, res) => {
  const id = req.params.id;
  const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;

  // Validate input
  if (!customer_name || !gst_number || !landline_num || !address || !email_id || !pan_no) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    UPDATE customers
    SET customer_name = $1, gst_number = $2, landline_num = $3, address = $4, email_id = $5, pan_no = $6, updated_at = CURRENT_TIMESTAMP
    WHERE customer_id = $7 RETURNING *`;
  const values = [customer_name, gst_number, landline_num, address, email_id, pan_no, id];

  client.query(query, values)
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    })
    .catch(err => {
      console.error('Error updating customer:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // index.js
// // index.js
// // index.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const { Client } = require('pg');
// const config = require('./config');

// const app = express();
// const port = 3000;

// // PostgreSQL database connection configuration
// const client = new Client(config.database);

// // Connect to PostgreSQL database
// client.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err.stack));

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Create a new customer
// app.post('/customers', (req, res) => {
//   const { customer_name, GSTNO, landline_num, address, email_id, pan_no } = req.body;

//   // Validate input
//   if (!customer_name || !GSTNO || !landline_num || !address || !email_id || !pan_no) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const query = `
//     INSERT INTO customers (customer_name, GSTNO, landline_num, address, email_id, pan_no) 
//     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
//   const values = [customer_name, GSTNO, landline_num, address, email_id, pan_no];

//   client.query(query, values)
//     .then(result => {
//       const newCustomer = result.rows[0];
//       res.status(201).json({
//         message: 'Customer created successfully',
//         customer: newCustomer
//       });
//     })
//     .catch(err => {
//       console.error('Error inserting customer:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Get all customers
// app.get('/all-customers', (req, res) => {
//   client.query('SELECT * FROM customers')
//     .then(result => res.json(result.rows))
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// // Get a customer by ID
// app.get('/customers/:id', (req, res) => {
//   const id = req.params.id;
//   client.query('SELECT * FROM customers WHERE customer_id = $1', [id])
//     .then(result => {
//       if (result.rows.length > 0) {
//         res.json(result.rows[0]);
//       } else {
//         res.status(404).json({ error: 'Customer not found' });
//       }
//     })
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// // Update a customer by ID
// app.put('/customers/:id', (req, res) => {
//   const id = req.params.id;
//   const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;
//   const query = `
//     UPDATE customers
//     SET customer_name = $1, gst_number = $2, landline_num = $3, address = $4, email_id = $5, pan_no = $6, updated_at = CURRENT_TIMESTAMP
//     WHERE customer_id = $7 RETURNING *`;
//   const values = [customer_name, gst_number, landline_num, address, email_id, pan_no, id];

//   client.query(query, values)
//     .then(result => {
//       if (result.rows.length > 0) {
//         res.json(result.rows[0]);
//       } else {
//         res.status(404).json({ error: 'Customer not found' });
//       }
//     })
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// // Delete a customer by ID
// app.delete('/customers/:id', (req, res) => {
//   const id = req.params.id;
//   const query = 'DELETE FROM customers WHERE customer_id = $1 RETURNING *';
//   client.query(query, [id])
//     .then(result => {
//       if (result.rows.length > 0) {
//         res.json({ message: 'Customer deleted successfully', customer: result.rows[0] });
//       } else {
//         res.status(404).json({ error: 'Customer not found' });
//       }
//     })
//     .catch(err => res.status(400).json({ error: err.message }));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
