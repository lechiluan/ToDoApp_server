require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
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
const port = process.env.PORT || 3000;

// Read SSL certificates
const privateKey = fs.readFileSync('/etc/letsencrypt/live/luanle.gcalls.vn/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/luanle.gcalls.vn/certificate.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/luanle.gcalls.vn/ca.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
