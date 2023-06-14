import productRouter from './products.route';
import categoryRouter from './categories.route';

console.log('cate', categoryRouter);
console.log('prod', productRouter);

export default function routerApi(app) {
	app.use('/product', productRouter);
	app.use('/category', categoryRouter);
}
