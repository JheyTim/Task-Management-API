require('dotenv').config(); // Load environment variables from .env

module.exports = {
  development: {
    url: process.env.DATABASE_URL, // Use DATABASE_URL from .env
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
};
