const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Database configuration
const isProduction = process.env.NODE_ENV === "production";
const dbConfig =
  isProduction && process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required for Render's SSL
      }
    : {
        host: "localhost",
        user: "postgres",
        password: "1234",
        database: "postgres",
        port: 5432,
      };

const pool = new Pool(dbConfig);

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to database successfully");
    release(); // Release the client back to the pool
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ All properties with filters
app.get("/api/properties", async (req, res) => {
  try {
    const { state, price, type, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM properties WHERE 1=1";
    const params = [];

    if (state) {
      params.push(`%${state}%`); // Use ILIKE for partial matching
      query += ` AND location ILIKE $${params.length}`;
    }
    if (price) {
      params.push(parseFloat(price));
      query += ` AND price <= $${params.length}`;
    }
    if (type) {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }

    query += ` ORDER BY id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    }`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Get single property
app.get("/api/properties/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM properties WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching property:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
