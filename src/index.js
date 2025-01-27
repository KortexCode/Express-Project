const express = require('./utils/express');
const routerApi = require('./routes');
const cors = require('cors');
const { logErrors, errorHandler } = require('./middleware/error.handler');

//SERVIDOR HTTP
const app = express();

//Indicamos por cual puerto se establecerá la comunicación entre el
//servidor y el navegador
const port = process.env.PORT || 3000;
//Configuración de Cors
const whitelist = [
	'http://127.0.0.1:5500',
	'http://www.example.com',
	'http://localhost:5500',
];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) {
			// Permitir solicitudes sin "origin" (como las de herramientas locales)
			callback(null, true);
		} else {
			callback(new Error('Acceso a ' + origin + ' no permitido'));
		}
	},
};
//Middleware para el cors//
app.use(cors(options));
//Middleware nativo para poder recibir datos con post
app.use(express.json());
//Llamado a la función manejadora de rutas, la mini-app.
routerApi(app);
//Mensaje de comprobación de escucha por el puerto 3000
app.listen(port, () => {
	console.log('Estoy escuchando por el 3000');
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
