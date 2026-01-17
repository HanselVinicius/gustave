import type { Express } from "express";
import SpotifyLoginController from "../controller/spotify.login.controller.js";
import type { Route } from "./abs/route.js";


export default class SpotifyLoginRoutes implements Route {
  constructor(private app: Express) { }

  public registerRoutes(): void {
    const controller = new SpotifyLoginController();
    this.app.get("/spotify/login", controller.login);
    this.app.get("/callback", controller.callback);
  }
}
