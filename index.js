const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const connection = require('./database');

const app = express();

// Load your self-signed certificate files
const privateKey = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};

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
const port = process.env.PORT || 443; // Change to 443 for HTTPS
app.use("/", todoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Create an HTTPS server using the self-signed certificate
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`HTTPS Server is running on port: ${port}`);
});
