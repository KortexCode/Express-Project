console.log('Chikorita esto es NODE!!');
const express = require('./utils/express');
const routerApi = require('./routes');

//SERVIDOR HTTP
const app = express();

//Indicamos por cual puerto se establecerá la comunicación entre el
//servidor y el navegador
const port = 3000;
//Middleware nativo para poder recibir datos con post
app.use(express.json());
app.listen(port, () => {
	console.log('CHikorita, estoy escuchando por el 3000');
});

routerApi(app);

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
