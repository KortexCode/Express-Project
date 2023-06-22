function validatorHandler(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		const { error } = schema.validate(data, { abortEarly: false });

		if (error) {
			const typeError = new Error(error.details[0].message);
			typeError.statusCode = 400;
			typeError.error = 'Bad request';

			next(typeError);
			return;
		}
		next();
	};
}

module.exports = validatorHandler;
