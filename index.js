console.log('Chikorita esto es NODE!!');
//Se crean los arrays de objetos de la API
const category = [
	{
		id: 1,
		name: 'Tecnología',
	},
	{
		id: 2,
		name: 'Desarrollo Web',
	},
	{
		id: 3,
		name: 'AI',
	},
];
const product = [
	{
		id: 1,
		name: 'Manga',
		price: 40,
	},
	{
		id: 2,
		name: 'Joystick',
		price: 120,
	},
	{
		id: 3,
		name: 'Smart Phone',
		price: '200',
	},
];
//Creación de servidor HTTP con Express
const express = require('express');
const app = express();
//Indicamos por cual puerto se establecerá la comunicación entre el
//servidor y el navegador
const port = 3000;
//Indicamos los métodos http y la respuesta que daremos a una solicitud
app.get('/', (req, res) => {
	res.send('Este es un mensaje del servidor CHikorita');
});
//Indicaremos varios tipos de ruta
//Dedemos saber que normalmente trabajaremos como una API por eso es
//mejor devolver un formato .json
app.get('/productos', (req, res) => {
	res.json(product);
});
//Se muestran las ctaegorias
app.get('/categorias', (req, res) => {
	res.json(category);
});
//Solicitud de una categoría por id
app.get('/categorias/:id', (req, res) => {
	const resObject = category.filter(item => {
		const { id } = req.params;
		return item.id === parseInt(id, 10);
	});
	res.json(resObject);
});
//Solicitud de una categoría y un producto por id
app.get('/categorias/:categoriaId/productos/:productoId', (req, res) => {
	const resCategory = category.filter(item => {
		const { categoriaId } = req.params;
		return item.id === parseInt(categoriaId, 10);
	});
	const resProducto = product.filter(item => {
		const { productoId } = req.params;
		return item.id === parseInt(productoId, 10);
	});
	const resTotal = [resCategory, resProducto];
	res.json(resTotal);
});

app.listen(port, () => {
	console.log('CHikorita, estoy escuchando por el 3000');
});
