const express = require("express");
const { PeerServer } = require("peer");

const app = express();
const cors = require("cors");
app.use(cors());

// Create PeerJS Signaling Server
const peerServer = PeerServer({
  port: 9000,         // Port for WebSocket communication
  path: "/ck-volleyball-stats",     // Custom path for PeerJS connections
  allow_discovery: true, // Allow listing connected peers
});

app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
  res.send("✅ PeerJS Signaling Server is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Express Server: http://localhost:${PORT}`);
  console.log(`🔗 PeerJS Signaling Server: ws://localhost:9000/myapp`);
});
