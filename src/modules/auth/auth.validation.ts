export const validateSignup = (body: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.name) return "Name is required";
  if (!emailRegex.test(body.email)) return "Invalid email";
  if (body.password.length < 6) return "Password minimum 6 characters";
  if (body.role !== "contributor" && body.role !== "maintainer")
    return "Invalid role";
  return null;
};

export const validateLogin = (body: { email: string; password: string }) => {
  if (!body.email) return "Email is required";
  if (!body.password) return "Password is required";
  return null;
};