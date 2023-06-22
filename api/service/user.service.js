const faker = require('../utils/faker');
//Se crea la clase Para manejar la lógica del producto
class UserService {
	constructor() {
		this.users = [];
		this.generate();
	}

	generate() {
		//Crear productos
		const maxSize = 20;
		for (let index = 1; index <= maxSize; index++) {
			const item = {
				id: index,
				name: faker.person.fullName({ lastName: faker.person.lastName() }),
				job: faker.person.jobDescriptor(),
			};
			this.users.push(item);
		}
	}
	find() {
		return this.users;
	}
	findOne(id) {
		return this.users.find(item => item.id === id);
	}
	create(data) {
		this.users.push(data);
	}
	update(id, data) {
		const usersUpdate = this.users.map(item => {
			if (id === item.id) {
				return data;
			}
			return item;
		});
		this.users = usersUpdate;
	}
	partialUpdate(id, data) {
		const usersUpdate = this.users.map(item => {
			if (id === item.id) {
				const itemUpdate = { ...item, ...data };
				return itemUpdate;
			}
			return item;
		});
		this.users = usersUpdate;
	}
	delete(id) {
		this.users.forEach((item, index) => {
			if (id === item.id) {
				this.users.splice(index, 1);
			}
		});
	}
}

module.exports = UserService;
/* create() {}
find() {}
create() {}
findOne() {}
update() {}
*/
