const { Client } = require('pg');

async function getConnection() {
	try {
		const client = new Client({
			host: 'localhost',
			port: '5432',
			user: 'maeno',
			password: 'admin123',
			database: 'my_store',
		});
		await client.connect();
		return client;
	} catch (error) {
		console.log('El error', error);
	}
}

module.exports = getConnection;
