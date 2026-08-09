import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 8080;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Server Started.");
});

app.listen(port, () => {
    console.log(`App was listen on port ${port}`);
})
