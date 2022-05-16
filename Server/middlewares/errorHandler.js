const errorHandler = (error, req, res, next) => {
	console.log(error);
	res.json({
		error,
	});
};

module.exports = errorHandler;
