import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import { config } from "../../config/env";

const signupUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const existingUser = await pool.query(
    `SELECT * FROM users WHERE email=$1`,
    [payload.email]
  );
  if (existingUser.rows.length > 0) {
    return {
      success: false,
      statusCode: 400,
      message: "User already exists",
    };
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const result = await pool.query(
    `INSERT INTO users (name,email,password,role)
     VALUES($1,$2,$3,$4)
     RETURNING id,name,email,role,created_at,updated_at`,
    [payload.name, payload.email, hashedPassword, payload.role]
  );
  return {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result.rows[0],
  };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [payload.email]);
  const user = result.rows[0];

  // ✅ Fixed: same 401 response for missing user or wrong password
  if (!user || !(await bcrypt.compare(payload.password, user.password))) {
    return {
      success: false,
      statusCode: 401,
      message: "Invalid credentials",
    };
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    config.jwt_secret as string,
    { expiresIn: "7d" }
  );
  return {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    },
  };
};

export const AuthServices = { signupUser, loginUser };