import faker from '../utils/faker';
import express from '../utils/express';

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

//Indicaremos varios tipos de ruta
//Dedemos saber que normalmente trabajaremos como una API por eso es
//mejor devolver un formato .json
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

export default router;
