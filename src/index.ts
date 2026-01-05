import express from "express";
import dotenv from "dotenv";
import SpotifyLoginRoutes from "./routes/spotify.login.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const message = process.env.MESSAGE || "FOR THOSE WHO COME AFTER";

app.get("/health", (req,res) =>{
    res.send(message)
})

app.listen(port, () => {
  const spotifyRoutes = new SpotifyLoginRoutes(app);
  spotifyRoutes.registerRoutes();
});
