const faker = require('../utils/faker');
const express = require('../utils/express');
//Se debe crear un enrutador de express
const router = express.Router();

//Crear productos
function productMaker(size) {
	const maxSize = 50 || size;
	const product = [];
	for (let index = 1; index <= maxSize; index++) {
		const item = {
			id: index,
			name: faker.commerce.productName(),
			price: faker.commerce.price(),
			image: faker.image.url(),
		};
		product.push(item);
	}
	return product;
}

//Ahora usaremos el router para las peticiones o respuestas e ignoraremos
//la ruta principal, en este caso product, dejaremos las partes dinámicas
//y específicas que sigan
router.get('/', (req, res) => {
	const { limit, offset, size } = req.query;
	if (size) {
		res.json([productMaker(size)]);
	} else if (limit && offset) {
		res.json([{ limit, offset }, productMaker()]);
	} else {
		res.json(productMaker());
	}
});

//Solicitud de una categoría por id
router.get('/:id', (req, res) => {
	const resObject = productMaker().filter(item => {
		const { id } = req.params;
		return item.id === parseInt(id, 10);
	});
	res.json(resObject);
});

//Solicitud de creación de un producto

router.post('/', (req, res) => {
	const body = req.body;
	res.json({
		message: 'create',
		data: body,
	});
});

module.exports = router;
