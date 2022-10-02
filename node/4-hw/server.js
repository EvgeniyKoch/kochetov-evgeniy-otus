import express from "express";
import path from "path";
import { promises as fs } from "fs"
import { Server as httpServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const geojsonFeaturePath = path.join(__dirname, "geojsonFeature.json");

const app = express();
const http = httpServer(app);
const io = new Server(http);

app.set("views", __dirname + "/views");
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", function (socket) {
  socket.on("setCoords", async (arg) => {
    const geojsonFeature = await fs.readFile(geojsonFeaturePath, { encoding: "utf8" });
    const geo = JSON.parse(geojsonFeature);
    const coords = [arg.latitude, arg.longitude];
    geo.geometry.coordinates.push(coords);
    await fs.writeFile(geojsonFeaturePath, JSON.stringify(geo));
    console.log('j');
    socket.emit("polyline", { geo });
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
