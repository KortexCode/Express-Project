/* const faker = require('../utils/faker'); */
const clientGetConnection = require('../libs/postgres');

//Se crea la clase Para manejar la lógica del producto

class UserService {
	constructor() {}

	async create(data) {
		return data;
	}

	async find() {
		try {
			const client = await clientGetConnection();
			const rta = await client.query('SELECT * FROM tasks');
			console.log('tablas', rta.rows);
			return rta.rows;
		} catch (error) {
			console.error('Error en la consulta:', error);
			throw new Error('No se pudo obtener los datos de la base de datos');
		}
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
