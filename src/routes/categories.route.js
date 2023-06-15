const express = require('../utils/express');
const CategoryService = require('../service/category.service');

const router = express.Router();
//Instancia del servicio
const service = new CategoryService();

//METODOS HTTP
//Solicitud de todas las categorías
router.get('/', (req, res) => {
	const { limit, offset, size } = req.query;
	if (size) {
		res.json(service.find());
	} else if (limit && offset) {
		res.json([{ limit, offset }, service.find()]);
	} else {
		res.json(service.find());
	}
});

//Solicitud de una categoría
router.get('/:id', (req, res) => {
	const { id } = req.params;
	const requireId = parseInt(id, 10);
	const product = service.findOne(requireId);

	if (product) res.status(200).json(product);
	else res.status(404).json({ message: 'Error, no found' });
});

//Solicitud de creación de una categoría
router.post('/', (req, res) => {
	const body = req.body;
	service.create(body);
	res.status(201).json({
		message: 'create',
		data: body,
	});
});

//Solicitud de actualización de una categoría de forma parcial
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const reqId = parseInt(id, 10);
	const body = req.body;
	service.update(reqId, body);
	res.json({
		message: 'update',
		data: body,
		reqId,
	});
});

//Solicitud de actualización de una categoría de forma parcial
router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const reqId = parseInt(id, 10);
	const body = req.body;
	service.partialUpdate(reqId, body);
	res.json({
		message: 'update',
		data: body,
		reqId,
	});
});

//Solicitud de eliminación de una categoría
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const reqId = parseInt(id, 10);
	service.delete(reqId);
	res.json({
		message: 'delete',
		reqId,
	});
});

module.exports = router;
