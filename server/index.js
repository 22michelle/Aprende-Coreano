import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import { connectDB } from "./database.js";

// Routes
import userRoutes from "../server/src/routes/user.routes.js";
import taskRoutes from "../server/src/routes/task.routes.js";
import moduleRoutes from "../server/src/routes/module.routes.js";

connectDB();

const app = express();
app.set("Port", 4000);

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/module", moduleRoutes);

app.listen(app.get("Port"), () => {
  console.log("Servidor escuchando por el puerto", app.get("Port"));
});
