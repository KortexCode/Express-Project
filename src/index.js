console.log('Chikorita esto es NODE!!');
const express = require('express');
import routerApi from './routes';

//SERVIDOR HTTP
const app = express();

//Indicamos por cual puerto se establecerá la comunicación entre el
//servidor y el navegador
const port = 3000;
app.listen(port, () => {
	console.log('CHikorita, estoy escuchando por el 3000');
});

//HOME
app.get('/', (req, res) => {
	res.send('Este es un mensaje del servidor Chikorita');
});

routerApi(app);

/*
app.get('/categorias/:categoriaId/productos/:productoId', (req, res) => {
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
}); */
