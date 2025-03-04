const express = require("express");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");
const http = require("http");

const app = express();
const PORT = 9000; //process.env.PORT || 9000;

app.use(cors());

// Create an HTTP server for PeerJS
const server = http.createServer(app);

// Attach ExpressPeerServer to the HTTP server
const peerServer = ExpressPeerServer(server, {
    path: "/myapp",  // Ensure this matches the frontend path
    allow_discovery: true,
    debug: true
});

// Use PeerJS as middleware (correct path)
app.use("/peerjs", peerServer);

peerServer.on("connection", (client) => {
    console.log(`🟢 New Peer Connected: ${client.getId()}`);
});

peerServer.on("disconnect", (client) => {
    console.log(`🔴 Peer Disconnected: ${client.getId()}`);
});

// Default route
app.get("/", (req, res) => {
    res.send("PeerJS Signaling Server is running...");
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Signaling server running on port: ${PORT}`);
});
