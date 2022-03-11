const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Metukashelly441994!",
  host: "localhost",
  port: "5433",
  database: "perntodo",
});

module.exports = pool;
