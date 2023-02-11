import ErrorResponse from "../utils/errorResponse.js";

const errorResponse = (req, res, next, err) => {
  let error = { ...err };
  error.mesage = err.message;

  console.log(error);

  //Mongoose bad ObjectID
  if (err.name === "CastError") {
    const message = `Resource not found with the id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};

export default errorResponse;
