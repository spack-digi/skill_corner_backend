const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: err.message || "Some error occurred",
    error: err,
  });
};


module.exports = {
  errorHandler,
};
