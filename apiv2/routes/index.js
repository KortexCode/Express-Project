const express = require('../utils/express');
const productRouter = require('./products.route');
const categoryRouter = require('./categories.route');
const userRouter = require('./users.route');

// Se crea una función para enrutar todas la rutas antes creadas
//usando el .use objeto indicamos la ruta y luego sus endpoits
/* function routerApi(app) {
	app.get('/api/v1', (req, res) => {
		res.send('conectado');
	});
	app.use('/api/v1/product', productRouter);
	app.use('/api/v1/category', categoryRouter);

} */

function routerApi(app) {
	const router = express.Router();
	router.get('/', (req, res) => {
		res.send('Conectado');
	});
	router.use('/product', productRouter);
	router.use('/category', categoryRouter);
	router.use('/user', userRouter);
	app.use('/api/v1', router);
}

module.exports = routerApi;
