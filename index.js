// const express = require('express');
// const bodyParser = require('body-parser');
// const { Client } = require('pg');

// const app = express();
// const port = 3000;

// // PostgreSQL database connection configuration
// const { Pool } = require('pg');

// // Create a new pool instance
// const client = new Client({
//   connectionString: 'postgresql://customer_dashboard_user:LZuKobHgcEP1q69mxnC2Pj5NF7e7hAT8@dpg-cqfoijd6l47c73bifd2g-a/customer_dashboard',
//   ssl: {
//     rejectUnauthorized: false // Necessary for some hosted services that use SSL
//   }
// });

// // Connect to PostgreSQL database and create table if it doesn't exist
// client.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL');
//     return createTableIfNotExists();
//   })
//   .catch(err => console.error('Connection error', err.stack));

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Create the customers table if it doesn't exist
// const createTablesQuery = `
// -- Drop tables if they already exist
// DROP TABLE IF EXISTS customers CASCADE;
// DROP TABLE IF EXISTS contacts CASCADE;

// CREATE TABLE IF NOT EXISTS customers (
//     customer_id SERIAL PRIMARY KEY,
//     customer_name VARCHAR(100) NOT NULL,
//     GSTNO VARCHAR(15),
//     landline_num VARCHAR(15),
//     address TEXT,
//     email_id VARCHAR(100),
//     pan_no VARCHAR(10),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE IF NOT EXISTS contacts (
//     contact_id SERIAL PRIMARY KEY,
//     contact_person VARCHAR(100) NOT NULL,
//     phone_num VARCHAR(15),
//     email_id VARCHAR(100),
//     address TEXT,
//     country VARCHAR(50),
//     state VARCHAR(50),
//     pincode VARCHAR(10),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// `;

// client.connect()
//   .then(() => client.query(createTablesQuery))
//   .then(() => {
//     console.log('Tables created successfully');
//   })
//   .catch(err => {
//     console.error('Error creating tables', err);
//   })
//   .finally(() => {
//     client.end();
//   });

// // Create a new customer
// app.post('/customers', (req, res) => {
//   const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;

//   // Validate input
//   if (!customer_name || !gst_number || !landline_num || !address || !email_id || !pan_no) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const query = `
//     INSERT INTO customers (customer_name, gst_number, landline_num, address, email_id, pan_no)
//     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
//   const values = [customer_name, gst_number, landline_num, address, email_id, pan_no];

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
//     .catch(err => {
//       console.error('Error fetching customers:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
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
//     .catch(err => {
//       console.error('Error fetching customer:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Update a customer by ID
// app.put('/customers/:id', (req, res) => {
//   const id = req.params.id;
//   const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;

//   // Validate input
//   if (!customer_name || !gst_number || !landline_num || !address || !email_id || !pan_no) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

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
//     .catch(err => {
//       console.error('Error updating customer:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // index.js
// // index.js
// // index.js



// old one


// const express = require('express');
// const bodyParser = require('body-parser');
// const { Client } = require('pg');
// const cors = require('cors');
// const config = require('./config');
// const app = express();
// const port = 3000;

// // Enable CORS for all routes
// app.use(cors({ origin: 'http://localhost:3000' }));

// // PostgreSQL database connection configuration
// const client = new Client(config.database);

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Function to create tables if they don't exist
// const createTables = () => {
//   const createTablesQuery = `
//     DROP TABLE IF EXISTS customers CASCADE;
//     DROP TABLE IF EXISTS contacts CASCADE;

//     CREATE TABLE IF NOT EXISTS customers (
//       customer_id SERIAL PRIMARY KEY,
//       customer_name VARCHAR(100) NOT NULL,
//       gst_number VARCHAR(15),
//       landline_num VARCHAR(15),
//       address TEXT,
//       email_id VARCHAR(100),
//       pan_no VARCHAR(10),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );

//     CREATE TABLE IF NOT EXISTS contacts (
//       contact_id SERIAL PRIMARY KEY,
//       contact_person VARCHAR(100) NOT NULL,
//       phone_num VARCHAR(15),
//       email_id VARCHAR(100),
//       address TEXT,
//       country VARCHAR(50),
//       state VARCHAR(50),
//       pincode VARCHAR(10),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   return client.query(createTablesQuery);
// };

// // Connect to PostgreSQL database and create tables
// client.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL');
//     return createTables();
//   })
//   .then(() => {
//     console.log('Tables created successfully');
//     // Start the server
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   })
//   .catch(err => {
//     console.error('Error initializing the application:', err.stack);
//   });

// // Create a new customer
// app.post('/customers', (req, res) => {
//   const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;

//   // Validate input
//   if (!customer_name || !gst_number || !landline_num || !address || !email_id || !pan_no) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const query = `
//     INSERT INTO customers (customer_name, gst_number, landline_num, address, email_id, pan_no) 
//     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
//   const values = [customer_name, gst_number, landline_num, address, email_id, pan_no];

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
//     .catch(err => {
//       console.error('Error fetching customers:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
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
//     .catch(err => {
//       console.error('Error fetching customer:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// // Update a customer by ID
// app.put('/customers/:id', (req, res) => {
//   const id = req.params.id;
//   const { customer_name, gst_number, landline_num, address, email_id, pan_no } = req.body;

//   // Validate input
//   if (!customer_name || !gst_number || !landline_num || !address || !email_id || !pan_no) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

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
//     .catch(err => {
//       console.error('Error updating customer:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
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
//     .catch(err => {
//       console.error('Error deleting customer:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });





// new one
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');
const config = require('./config');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000' }));

// PostgreSQL database connection configuration
const client = new Client(config.database);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to create tables if they don't exist
const createTables = () => {
  const createTablesQuery = `
    DROP TABLE IF EXISTS contacts CASCADE;
    DROP TABLE IF EXISTS customers CASCADE;

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
      status VARCHAR(10) CHECK (status IN ('active', 'inactive')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return client.query(createTablesQuery);
};

// Connect to PostgreSQL database and create tables
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    return createTables();
  })
  .then(() => {
    console.log('Tables created successfully');
    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error initializing the application:', err.stack);
  });

// Create a new customer
app.post('/customers', (req, res) => {
  const { customer_name, gst_number, landline_num, email_id, pan_no, tan_number, address, city, state, country, pincode } = req.body;

  // Validate input
  if (!customer_name || !gst_number || !landline_num || !email_id || !pan_no || !tan_number || !address || !city || !state || !country || !pincode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO customers (customer_name, gst_number, landline_num, email_id, pan_no, tan_number, address, city, state, country, pincode) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
  const values = [customer_name, gst_number, landline_num, email_id, pan_no, tan_number, address, city, state, country, pincode];

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
  const { customer_name, gst_number, landline_num, email_id, pan_no, tan_number, address, city, state, country, pincode } = req.body;

  // Validate input
  if (!customer_name || !gst_number || !landline_num || !email_id || !pan_no || !tan_number || !address || !city || !state || !country || !pincode) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    UPDATE customers
    SET customer_name = $1, gst_number = $2, landline_num = $3, email_id = $4, pan_no = $5, tan_number = $6, address = $7, city = $8, state = $9, country = $10, pincode = $11, updated_at = CURRENT_TIMESTAMP
    WHERE customer_id = $12 RETURNING *`;
  const values = [customer_name, gst_number, landline_num, email_id, pan_no, tan_number, address, city, state, country, pincode, id];

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

// Delete a customer by ID
app.delete('/customers/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM customers WHERE customer_id = $1 RETURNING *';
  client.query(query, [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json({ message: 'Customer deleted successfully', customer: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting customer:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Create a new contact
app.post('/contacts', (req, res) => {
  const { customer_id, contact_person, phone_num, email_id, address, city, state, country, pincode, department, status } = req.body;

  // Validate input
  if (!customer_id || !contact_person || !phone_num || !email_id || !address || !city || !state || !country || !pincode || !department || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO contacts (customer_id, contact_person, phone_num, email_id, address, city, state, country, pincode, department, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
  const values = [customer_id, contact_person, phone_num, email_id, address, city, state, country, pincode, department, status];

  client.query(query, values)
    .then(result => {
      const newContact = result.rows[0];
      res.status(201).json({
        message: 'Contact created successfully',
        contact: newContact
      });
    })
    .catch(err => {
      console.error('Error inserting contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Get all contacts
app.get('/all-contacts', (req, res) => {
  client.query('SELECT * FROM contacts')
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error fetching contacts:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Get a contact by ID
app.get('/contacts/:id', (req, res) => {
  const id = req.params.id;
  client.query('SELECT * FROM contacts WHERE contact_id = $1', [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    })
    .catch(err => {
      console.error('Error fetching contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Update a contact by ID
app.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const { customer_id, contact_person, phone_num, email_id, address, city, state, country, pincode, department, status } = req.body;

  // Validate input
  if (!customer_id || !contact_person || !phone_num || !email_id || !address || !city || !state || !country || !pincode || !department || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    UPDATE contacts
    SET customer_id = $1, contact_person = $2, phone_num = $3, email_id = $4, address = $5, city = $6, state = $7, country = $8, pincode = $9, department = $10, status = $11, updated_at = CURRENT_TIMESTAMP
    WHERE contact_id = $12 RETURNING *`;
  const values = [customer_id, contact_person, phone_num, email_id, address, city, state, country, pincode, department, status, id];

  client.query(query, values)
    .then(result => {
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    })
    .catch(err => {
      console.error('Error updating contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Delete a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM contacts WHERE contact_id = $1 RETURNING *';
  client.query(query, [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.json({ message: 'Contact deleted successfully', contact: result.rows[0] });
      } else {
        res.status(404).json({ error: 'Contact not found' });
      }
    })
    .catch(err => {
      console.error('Error deleting contact:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});
