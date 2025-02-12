const express = require('../utils/express');
const ProductService = require('../service/user.service');

//Se debe crear un enrutador de express
const router = express.Router();
//Instancia del servicio
const service = new ProductService();

//Ahora usaremos el router para las peticiones o respuestas e ignoraremos
//la ruta principal, en este caso api/v1/product, dejaremos las partes dinámicas
//y específicas solamente
router.get('/', async (req, res, next) => {
	try {
		const { limit, offset, size } = req.query;
		if (size) {
			res.json(service.find());
		} else if (limit && offset) {
			res.json([{ limit, offset }, service.find()]);
		} else {
			res.json(await service.find());
		}
	} catch (error) {
		next(error);
	}
});

//Solicitud de un producto
router.get('/:id', (req, res) => {
	const { id } = req.params;
	const requireId = parseInt(id, 10);
	const product = service.findOne(requireId);

	if (product) res.status(200).json(product);
	else res.status(404).json({ message: 'Error, no found' });
});

//Solicitud de creación de un producto
router.post('/', (req, res) => {
	const body = req.body;
	service.create(body);
	res.status(201).json({
		message: 'create',
		data: body,
	});
});

//Solicitud de actualización de un producto de forma parcial
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

//Solicitud de actualización de un producto de forma parcial
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
//Solicitud de eliminación de un producto
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
