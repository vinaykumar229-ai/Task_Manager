import express from "express";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => console.error("Data Source initialization error:", err));
