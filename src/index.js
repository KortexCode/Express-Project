const express = require('./utils/express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler } = require('./middleware/error.handler');

//SERVIDOR HTTP
const app = express();

//Indicamos por cual puerto se establecerá la comunicación entre el
//servidor y el navegador
const port = 3000;
//Middleware nativo para poder recibir datos con post
app.use(express.json());
//Llamado a la función manejadora de rutas, la mini-app.
routerApi(app);
//Configuración de Cors
const whitelist = ['http://127.0.0.1:5500', 'http://www.example.com'];
const option = {
	origin: (origin, callback) => {
		const isAllowed = whitelist.includes(origin) || origin;
		if (isAllowed) {
			callback(null, true);
		} else {
			callback(new Error('Acceso a ' + origin + ' no permitido'));
		}
	},
};
app.use(cors(option));
//Mensaje de comprobación de escucha por el puerto 3000
app.listen(port, () => {
	console.log('CHikorita, estoy escuchando por el 3000');
});
//Middlewares para manejar errores en la app de manera global
app.use(logErrors, errorHandler);

/* app.use(); */
/* app.get('/categorias/:categoriaId/productos/:productoId', (req, res) => {
	const resCategory = categoryMaker().filter(item => {
		const { categoriaId } = req.params;
		return item.id === parseInt(categoriaId, 10);
	});
	const resProducto = productMaker().filter(item => {
		const { productoId } = req.params;
		return item.id === parseInt(productoId, 10);
	});
	const resTotal = [resCategory, resProducto];
	res.json(resTotal);
});
 */
