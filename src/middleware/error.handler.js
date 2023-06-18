function logErrors(err, req, res, next) {
	console.error(err);
	next(err);
}

function errorHandler(err, req, res, /* next */) {
	res.status(404).json({
		message: err.message,
		stack: err.stack,
	});
}

module.exports = { logErrors, errorHandler };
