const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
// const PORT = 3000; // local
const PORT = 443;

app.use(cors());
app.use(express.json());

// Create an HTTP server for PeerJS
const server = http.createServer(app);

// Default route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

let data = [null, null, null];

app.get("/data", (req, res) => {
    res.send(data);
});

app.post("/data", (req, res) => {
    data[Number(req.body.mode) - 1] = req.body;

    res.json();
});
app.post("/clear-data", (req, res) => {
    data.forEach((d, index) => data[index] = null)
    res.json();
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Servererver running on port: ${PORT}`);
});
