const joi = require('joi');

const id = joi.string().min(1).max(3);
const name = joi.string().min(5).max(60);
const price = joi.number().min(1).max(1000);
const image = joi.string().min(5).max(60);

const createProductSchema = joi.object({
	id: id,
	name: name.required(),
	price: price.required(),
	image: image.required(),
});

const updateProductSchema = joi.object({
	name: name.required(),
	price: price.required(),
	image: image.required(),
});
const updatePartialProductSchema = joi.object({
	name: name,
	price: price.required(),
	image: image,
});

const getProductSchema = joi.object({
	id: id.required(),
});

module.exports = {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	updatePartialProductSchema,
};
