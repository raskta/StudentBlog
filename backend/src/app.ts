import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import routes from "./shared/routes/routes";
import { initDatabase } from "./config/data-source";
import { errorHandler } from "./middleware/errorHandler.middleware";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// permitir acessar as imagens do servidor
app.use("/uploads", express.static("uploads"));

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
app.use(routes);

//error handler
app.use(errorHandler as unknown as express.ErrorRequestHandler);

//database
initDatabase();

try {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
} catch (error) {
  console.error("Server failed to start:", error);
}
