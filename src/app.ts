import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.route";
import issueRoutes from "./modules/issues/issue.route";

import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/issues", issueRoutes);

app.get("/", (req, res) => {
  res.send("DevPulse Server Running");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;