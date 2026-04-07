const { Pool } = require("pg");

// PostgreSQL connection config
const pool = new Pool({
  user: "postgres",       
  host: "localhost",
  database: "tododb",
  password: "admin123",
  port: 5432,
});

module.exports = pool;