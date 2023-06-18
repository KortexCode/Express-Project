const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().alphanum().min(5).max(60);
const price = joi.string().min(1).max(10);
const image = joi.string().min(5).max(60);

const createProductSchema = joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = joi.object({
  id: id.required(),
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema};

