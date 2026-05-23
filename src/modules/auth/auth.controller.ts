import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { validateSignup, validateLogin } from "./auth.validation";

const signup = catchAsync(async (req: Request, res: Response) => {
  const validationError = validateSignup(req.body);
  if (validationError) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: validationError,
    });
  }
  const result = await AuthServices.signupUser(req.body);
  sendResponse(res, result);
});

const login = catchAsync(async (req: Request, res: Response) => {
  // ✅ Added validation
  const validationError = validateLogin(req.body);
  if (validationError) {
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: validationError,
    });
  }
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, result);
});

export const AuthControllers = { signup, login };