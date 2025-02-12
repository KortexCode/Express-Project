require('dotenv').config();

const config = {
	nodeEnv: process.env.NODE_ENVIROTMENT || 'dev',
	port: process.env.PORT || 3000,
	dbUser: process.env.PG_DBUSER,
	dbHost: process.env.PG_DBHOST,
	dbPassword: process.env.PG_DBPASSWORD,
	dbName: process.env.PG_DBNAME,
	dbPort: process.env.PG_DBPORT,
};

module.exports = { config };
