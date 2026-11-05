const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'talent_carpet',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // change to console.log in development if query logs are desired
    pool: {
      max: 50,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true,
      timestamps: true,
    },
  }
);

const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log(` MySQL Database Connected: ${process.env.DB_HOST || '127.0.0.1'}`);
  } catch (error) {
    console.error(' MySQL connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectMySQL };
