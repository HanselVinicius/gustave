import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import SpotifyLoginRoutes from "./routes/spotify.login.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => {
  const spotifyRoutes = new SpotifyLoginRoutes(app);
  spotifyRoutes.registerRoutes();
});
