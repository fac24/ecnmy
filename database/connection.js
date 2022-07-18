const pg = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = db;
