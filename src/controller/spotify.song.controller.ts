import type { Request, Response } from "express";
import { SpotifyDeleteCommand } from "../service/spotify.delete.command.service.js";
import { SpotifyCommunicationMeta } from "../domain/SpotifyCommunicationMeta.js";

export class SpotifySongController {

    public delete(_req: Request, res: Response) {
        const songId = _req.params.songId;
        const authHeader = _req.headers['authorization'];

        if(!songId || !authHeader){
            res.status(422).send();
        }

        const spotifyCommunicationMeta = new SpotifyCommunicationMeta(authHeader!);
        const service = new SpotifyDeleteCommand(spotifyCommunicationMeta);
        service.execute(songId!.split(","));
        res.status(204).send();
    }

}