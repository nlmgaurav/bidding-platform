require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectDB = require("./database"); // MongoDB connection setup

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use("/users", authRoutes);
app.use("/items", itemRoutes);
app.use("/bids", bidRoutes);
app.use("/notifications", notificationRoutes);
app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("bid", (data) => {
    io.emit("update", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
