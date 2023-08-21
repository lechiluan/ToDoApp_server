require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database');

// routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

// database connection
connection();

// middleware
app.use(express.json());
app.use(cors());

// routes
const port = process.env.PORT || 8080;
app.use("/", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    }
);