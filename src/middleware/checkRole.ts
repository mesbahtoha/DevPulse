import {
  NextFunction,
  Request,
  Response,
} from "express";

const checkRole =
  (...roles: string[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {

      return res.status(403).json({
        success: false,
        message: "Forbidden Access",
      });
    }

    next();
  };

export default checkRole;