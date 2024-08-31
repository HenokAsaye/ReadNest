import express from "express";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/api/books", apiRoutes);

export default app;