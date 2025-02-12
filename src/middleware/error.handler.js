function logErrors(err, req, res, next) {
	next(err);
}

function errorHandler(err, req, res, next) {
	console.log('status Code', err.statusCode);
	res.status(err.statusCode).json({
		statusCode: err.statusCode,
		error: err.error,
		message: err.message,
	});
}

module.exports = { logErrors, errorHandler };
