import express from "express";
import cors from "cors";
import "dotenv/config";
import main from "./config/mongoDB.js";
import { ensureDefaultAdmin } from "./config/seedAdmin.js";
import authRouter from "./routes/authRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import teacherRouter from "./routes/teacherRoutes.js";
import studentRouter from "./routes/studentRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*",
    }),
);


app.get("/", (req, res) => {
    res.send("Server Started.");
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/student", studentRouter);

const startServer = async () => {
    try {
        await main();
        await ensureDefaultAdmin();

        app.listen(port, () => {
            console.log(`App was listen on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();