import express from "express";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import apiRoutes from "./routes/apiRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/api/books", apiRoutes);

export default app;