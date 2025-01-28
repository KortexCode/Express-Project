const faker = require('../utils/faker');
const clientGetConnection = require('../libs/postgres');
//Se crea la clase Para manejar la lógica del producto
class ProductService {
	constructor() {
		this.products = [];
		this.generate();
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
		/* return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!this.products.length) {
					reject(Error('products not found'));
				}
				resolve(this.products);
			}, 3000);
		}); */
		const client = await clientGetConnection();
		const rta = await client.query('SELECT * FROM tasks');
		console.log('tablas', rta.rows);
		return rta.rows;
	}
	async findOne(id) {
		const index = this.products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			throw new Error('product not found');
		} else {
			return this.products[index];
		}
	}
	async create(data) {
		const { id, name, price, image } = data;
		this.products.push({
			id,
			name,
			price,
			image,
		});
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
