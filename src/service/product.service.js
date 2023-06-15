const faker = require('../utils/faker');
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
	find() {
		return this.products;
	}
	findOne(id) {
		return this.products.find(item => item.id === id);
	}
	create(data) {
		this.products.push(data);
	}
	update(id, data) {
		console.log('first');
		const productsUpdate = this.products.map(item => {
			if (id === item.id) {
				console.log('actualiza', data);
				return data;
			}
			return item;
		});
		this.products = productsUpdate;
	}
	partialUpdate(id, data) {
		const productsUpdate = this.products.map(item => {
			if (id === item.id) {
				const itemUpdate = { ...item, ...data };
				console.log('partial', itemUpdate);
				return itemUpdate;
			}
			return item;
		});
		this.products = productsUpdate;
	}
	delete(id) {
		/* this.products.map((item, index) => {
			if (id === item.id) {
				this.products.splice(index, 1);
			}
			return item;
		});
 */
		this.products.forEach((item, index) => {
			if (id === item.id) {
				this.products.splice(index, 1);
			}
		});
	}
}

module.exports = ProductService;
/* create() {}
find() {}
create() {}
findOne() {}
update() {}
*/
