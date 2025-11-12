import type { Express } from "express";
import SpotifyLoginController from "../controller/spotify.login.controller.js";


export default class SpotifyLoginRoutes {
  constructor(private app: Express) { }

  public registerRoutes(): void {
    const controller = new SpotifyLoginController();
    this.app.get("/login", controller.login);
    this.app.get("/callback", controller.callback);
  }
}
