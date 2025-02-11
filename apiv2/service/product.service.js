const pool = require('../libs/postgres.pool');

//Se crea la clase Para manejar la lógica del producto
class ProductService {
	constructor() {
		if (ProductService.instance) {
			return this;
		}
		ProductService.instance = this;
		this.products = [];
		this.pool = pool;
		this.pool.on('error', err => {
			console.error('Error en conexión', err);
		});
	}

	async find() {
		const query = 'SELECT * FROM products';
		const rta = await this.pool.query(query);
		return rta.rows;
	}
	async findOne(id) {
		const query = `SELECT id, name, price, image FROM products WHERE id=${id}`;
		const rta = await this.pool.query(query);
		const product = rta.rows;
		if (!product[0]) {
			throw new Error('product not found');
		} else {
			return product;
		}
	}
	async create(data) {
		const { name, price, image } = data;
		const query = 'INSERT INTO products(name, price, image) VALUES($1, $2, $3)';
		const values = [name, price, image];
		console.log('CREANDO PRODUCTO');
		await this.pool.query(query, values);
	}
	async update(id, data) {
		//Extraemos los productos de la base de datos
		const rta = await this.pool.query('SELECT * FROM products');
		const products = rta.rows; //Obetemos el array de objetos
		//Buscamos el productos solicitado comparando el id del producto
		const index = products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			//Si el producto no existe, lanza error
			throw new Error('product not found');
		} else {
			const { name, price, image } = data; //Obetenemos los datos a actualizar
			const values = [name, price, image]; //Se guardan en un array para el query
			products[index] = data; //Este es el producto que se enviará como respuesta al cliente
			await this.pool.query(
				`UPDATE products SET name=$1, price=$2, image=$3 WHERE id=${id}`,
				values
			);
			return products[index];
		}
	}

	async partialUpdate(id, data) {
		//Extraemos los productos de la base de datos
		const rta = await this.pool.query('SELECT * FROM products');
		const products = rta.rows; //Obetemos el array de objetos
		//Buscamos el productos solicitado comparando el id del producto
		const index = products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			throw new Error('product not found');
		} else {
			//Se crean dos arrays vacios
			const queryString = [];
			const values = [];
			//Se obtienen las llaves y valores del objeto en u array de arrays y se recorre
			Object.entries(data).forEach((entrie, index) => {
				values[index] = entrie[1]; //Guardamos el valor de cada array y se posiciona según el index
				queryString[index] = `${entrie[0]}=$${index + 1}`; //Se crea la consulta de parámetros dinámicos
			});

			await this.pool.query(
				`UPDATE products SET ${queryString.join(',')} WHERE id=${id}`,
				values
			);
			products[index] = { ...products[index], ...data };
			return products[index];
		}
	}
	async delete(id) {
		//Extraemos los productos de la base de datos
		const rta = await this.pool.query('SELECT * FROM products');
		const products = rta.rows; //Obetemos el array de objetos
		const index = products.findIndex(item => {
			return id === item.id;
		});
		if (index === -1) {
			throw new Error('product not found');
		} else {
			await this.pool.query(`DELETE FROM products WHERE id=${id}`);
			return products[index];
		}
	}
}

module.exports = ProductService;
