import express from "express";
import dotenv from "dotenv";
import SpotifyLoginRoutes from "./routes/spotify.login.routes.js";
import { SpotifySongRoutes } from "./routes/spotify.song.routes.js";
import type { Route } from "./routes/abs/route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const message = process.env.MESSAGE || "FOR THOSE WHO COME AFTER";

app.use(express.json({
  type: 'application/json'
}));

app.get("/health", (req,res) =>{
    res.send(message)
})

app.listen(port, () => {
  const routes: Route[] = [
    new SpotifyLoginRoutes(app),
    new SpotifySongRoutes(app)
  ]
  routes.forEach(route => route.registerRoutes())
});