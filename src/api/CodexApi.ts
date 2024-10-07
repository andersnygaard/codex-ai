import express, { Application } from 'express';
import swaggerUi from "swagger-ui-express";
import morgan from 'morgan';
import { RegisterRoutes } from "./routes";

class CodexApi {
  private app: Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
    this.app.use(express.static("public"));
    RegisterRoutes(this.app);
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );
  }

  public start = async () => {
    const PORT = process.env.PORT || 3000;

    this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

const instance = new CodexApi();

export default instance;
