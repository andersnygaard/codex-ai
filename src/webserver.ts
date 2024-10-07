import express, { Application } from 'express';
import swaggerUi from "swagger-ui-express";
import morgan from 'morgan';
import path from 'path';
import { RegisterRoutes } from "./api/routes";

class WebServer {
  private app: Application = express();

  constructor() {
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
    this.app.use(express.static("public"));
    
    // API routes
    RegisterRoutes(this.app);

    // Swagger docs route
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );

    // Serve the Vue app's static files from /spa/dist
    this.app.use(express.static(path.join(__dirname, '..', 'src', 'spa', 'dist')));

    // Handle all SPA routes by serving the index.html
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'spa', 'src', 'dist', 'index.html'));
    });
  }

  public start = async () => {
    const PORT = process.env.PORT || 3000;

    this.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

const instance = new WebServer();

export default instance;
