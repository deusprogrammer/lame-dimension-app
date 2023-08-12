import express from "express";
import cors from "cors";

import scriptsRoute from "./routes/scriptRoutes.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import profileRoute from "./routes/profileRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();
let port = process.env.PORT || 8080;

app.use(express.json({ limit: "50Mb" }));
app.use(cors());
app.use("/assets", express.static(__dirname + "/assets"));

app.set("etag", false);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/*
 * Routes
 */
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/profiles", profileRoute);
app.use("/scripts", scriptsRoute);

app.listen(port);
console.log("Lame Dimension API server started on: " + port);
