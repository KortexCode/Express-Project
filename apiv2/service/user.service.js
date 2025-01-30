/* const faker = require('../utils/faker'); */
const clientGetConnection = require('../libs/postgres');

//Se crea la clase Para manejar la lógica del producto

class UserService {
	constructor() {}

	async create(data) {
		return data;
	}

	async find() {
		const client = await clientGetConnection();
		const rta = await client.query('SELECT * FROM tasks');
		return rta.rows;
	}

	findOne(id) {
		return { id };
	}

	async update(id, changes) {
		return {
			id,
			changes,
		};
	}

	async delete(id) {
		console.log(id);
		return { id };
	}
}

module.exports = UserService;
