import jwt from "jsonwebtoken";
import { config } from "../config/env";

const verifyToken = (token: string) => {

  return jwt.verify(
    token,
    config.jwt_secret as string
  );
};

export default verifyToken;