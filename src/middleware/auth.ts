import {
  NextFunction,
  Request,
  Response,
} from "express";

import verifyToken from "../utils/verifyToken";
import { JwtPayload } from "../interfaces";

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    let token = "";

    // Support:
    // Bearer TOKEN

    if (authHeader.startsWith("Bearer ")) {

      token = authHeader.split(" ")[1];

    } else {

      token = authHeader;
    }

    const decoded =
      verifyToken(token) as JwtPayload;

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default auth;