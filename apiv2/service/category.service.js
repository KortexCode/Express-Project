const faker = require('../utils/faker');
//Se crea la clase Para manejar la lógica del producto
class CategoryService {
	constructor() {
		this.categories = [];
		this.generate();
	}

	generate() {
		//Crear productos
		const maxSize = 10;
		for (let index = 1; index <= maxSize; index++) {
			const item = {
				id: index,
				name: faker.commerce.product(),
			};
			this.categories.push(item);
		}
		return this.categories;
	}
	find() {
		return this.categories;
	}
	findOne(id) {
		return this.categories.find(item => item.id === id);
	}
	create(data) {
		this.categories.push(data);
	}
	update(id, data) {
		const categoriesUpdate = this.categories.map(item => {
			if (id === item.id) {
				return data;
			}
			return item;
		});
		this.categories = categoriesUpdate;
	}
	partialUpdate(id, data) {
		const categoriesUpdate = this.categories.map(item => {
			if (id === item.id) {
				const itemUpdate = { ...item, ...data };
				return itemUpdate;
			}
			return item;
		});
		this.categories = categoriesUpdate;
	}
	delete(id) {
		/* this.products.map((item, index) => {
			if (id === item.id) {
				this.products.splice(index, 1);
			}
			return item;
		});
 */
		this.categories.forEach((item, index) => {
			if (id === item.id) {
				this.categories.splice(index, 1);
			}
		});
	}
}

module.exports = CategoryService;
