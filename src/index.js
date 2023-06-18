console.log('Chikorita esto es NODE!!');
const express = require('./utils/express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middleware/error.handler');

//SERVIDOR HTTP
const app = express();

//Indicamos por cual puerto se establecerá la comunicación entre el
//servidor y el navegador
const port = 3000;
//Middleware nativo para poder recibir datos con post
app.use(express.json());
//Mensaje de comprobación de escucha por el puerto 3000
app.listen(port, () => {
	console.log('CHikorita, estoy escuchando por el 3000');
});
//Llamado a la función manejadora de rutas, la mini-app.
routerApi(app);
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
