function logErrors(err, req, res, next) {
	/* console.error(err); */
	next(err);
}

function errorHandler(err, req, res /* next */) {
	console.log('error en midlleerro', err);
	res.status(err.statusCode).json({
		statusCode: err.statusCode,
		error: err.error,
		message: err.message,
	});
}

module.exports = { logErrors, errorHandler };
