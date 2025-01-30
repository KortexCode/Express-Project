const faker = require('../utils/faker');
const pool = require('../libs/postgres.pool');

//Se crea la clase Para manejar la lógica del producto
class ProductService {
	constructor() {
		if (ProductService.instance) {
			return this;
		}
		ProductService.instance = this;
		this.products = [];
		this.generate();
		this.pool = pool;
		this.pool.on('error', err => {
			console.error('Error en conexión', err);
		});
	}

	generate() {
		//Crear productos
		const maxSize = 50;
		for (let index = 1; index <= maxSize; index++) {
			const item = {
				id: index,
				name: faker.commerce.productName(),
				price: faker.commerce.price(),
				image: faker.image.url(),
			};
			this.products.push(item);
		}
	}

	async find() {
		const query = 'SELECT * FROM tasks';
		const rta = await this.pool.query(query);
		return rta.rows;
	}
	async findOne(id) {
		const query = `SELECT id, title, completed FROM tasks WHERE id=${id}`;
		const rta = await this.pool.query(query);
		const product = rta.rows;
		if (!product[0]) {
			throw new Error('product not found');
		} else {
			return product;
		}
	}
	async create(data) {
		try {
			const { name, price, image } = data;
			console.log('los valores llegan?', name, price);
			const query =
				'INSERT INTO products(name, price, image) VALUES($1, $2, $3)';
			const values = [name, price, image];
			console.log('CREANDO PRODUCTO');
			await this.pool.query(query, values);
		} catch (error) {
			console.log(error);
		}
		/* console.log('Resultado', rta); */
	}
	async update(id, data) {
		const index = this.products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			throw new Error('product not found');
		} else {
			this.products[index] = data;
			return this.products[index];
		}
	}

	async partialUpdate(id, data) {
		const index = this.products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			throw new Error('product not found');
		} else {
			this.products[index] = { ...this.products[index], ...data };
			return this.products[index];
		}
	}
	async delete(id) {
		const index = this.products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			throw new Error('product not found');
		} else {
			this.products.splice(index, 1);
			return this.products[index];
		}
	}
}

module.exports = ProductService;
/* create() {}
find() {}
create() {}
findOne() {}
update() {}
*/
