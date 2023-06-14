const faker = require('../utils/faker');
const express = require('../utils/express');

const router = express.Router();

//Crear categorías
function categoryMaker(size = 10) {
	const category = [];
	for (let index = 1; index <= size; index++) {
		const item = {
			id: index,
			name: faker.commerce.product(),
		};
		category.push(item);
	}
	return category;
}

//Se muestran las ctaegorias
router.get('/categorias', (req, res) => {
	res.json(categoryMaker());
});
//Solicitud de una categoría por id
router.get('/categorias/:id', (req, res) => {
	const resObject = categoryMaker().filter(item => {
		const { id } = req.params;
		return item.id === parseInt(id, 10);
	});
	res.json(resObject);
});

module.exports = router;
