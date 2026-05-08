const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

const socketHandler = require("./socket/socketHandler");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api", meetingRoutes);

app.get("/", (req, res) => {
    res.send("IntellMeet Backend Running");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

socketHandler(io);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});