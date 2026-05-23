import {
  NextFunction,
  Request,
  Response,
} from "express";

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.status(500).json({
    success: false,
    message:
      error.message ||
      "Internal Server Error",
    errors: error,
  });
};

export default globalErrorHandler;