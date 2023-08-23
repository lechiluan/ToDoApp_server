require('dotenv').config();
const express = require('express');
const https = require('https'); // Import the 'https' module
const fs = require('fs'); // Import the 'fs' module for reading SSL certificates
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
const port = process.env.PORT || 443;
app.use("/", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Load SSL certificate and key files
const privateKey = fs.readFileSync('/etc/letsencrypt/live/luanle.gcalls.vn/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/luanle.gcalls.vn/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/luanle.gcalls.vn/chain.pem', 'utf8'); 

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Create an HTTPS server with the app
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
