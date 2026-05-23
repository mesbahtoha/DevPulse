import app from "./app";
import { config } from "./config/env";
import { initDB } from "./config/db";

const startServer = async () => {

  await initDB();

  app.listen(config.port, () => {
    console.log(
      `Server Running On Port ${config.port}`
    );
  });
};

startServer();