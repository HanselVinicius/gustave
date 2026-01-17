import type { Express } from "express";
import type { Route } from "./abs/route.js";
import { SpotifySongController } from "../controller/spotify.song.controller.js";

export class SpotifySongRoutes implements Route {

    constructor(private readonly app: Express) { }

    public registerRoutes(): void {
        const controller = new SpotifySongController();
        this.app.delete("/spotify/song/:songId",controller.delete);
    }

}