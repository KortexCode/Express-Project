const express = require('../utils/express');
const ProductService = require('../service/product.service');
const validatorHandler = require('../middleware/validator.handler');
const { getProductSchema } = require('../schemas/product.dto');
const { createProductSchema } = require('../schemas/product.dto');
const { updateProductSchema } = require('../schemas/product.dto');
const { updatePartialProductSchema } = require('../schemas/product.dto');

//Se debe crear un enrutador de express
const router = express.Router();
//Instancia del servicio
const service = new ProductService();

//Ahora usaremos el router para las peticiones o respuestas e ignoraremos
//la ruta principal, en este caso api/v1/product, dejaremos las partes dinámicas
//y específicas solamente
router.get('/', async (req, res) => {
	try {
		const { limit, offset, size } = req.query;
		if (size) {
			res.json(await service.find());
		} else if (limit && offset) {
			res.json([{ limit, offset }, await service.find()]);
		} else {
			res.json(await service.find());
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

//Solicitud de un producto
router.get(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const requireId = parseInt(id);
			const product = await service.findOne(requireId);
			res.status(200).json(product);
		} catch (error) {
			console.log('entro al error');
			const typeError = new Error(error.message);
			typeError.statusCode = '404';
			typeError.error = 'Not Found';
			next(typeError);
		}
	}
);

//Solicitud de creación de un producto
router.post(
	'/',
	validatorHandler(createProductSchema, 'body'),
	async (req, res) => {
		const body = req.body;
		await service.create(body);
		res.status(201).json({
			message: 'create',
			data: body,
		});
	}
);

//Solicitud de actualización de un producto de forma parcial
router.put(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updateProductSchema, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const reqId = parseInt(id, 10);
			const body = req.body;
			const resItem = await service.update(reqId, body);
			res.status(200).json({
				message: 'update',
				data: resItem,
				reqId,
			});
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}
);

//Solicitud de actualización de un producto de forma parcial
router.patch(
	'/:id',
	validatorHandler(getProductSchema, 'params'),
	validatorHandler(updatePartialProductSchema, 'body'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const reqId = parseInt(id, 10);
			const body = req.body;
			const resItem = await service.partialUpdate(reqId, body);
			res.status(200).json({
				message: 'update',
				data: resItem,
			});
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}
);
//Solicitud de eliminación de un producto
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const reqId = parseInt(id, 10);
		const resItem = await service.delete(reqId);
		res.status(200).json({
			message: 'delete',
			resItem,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

module.exports = router;
