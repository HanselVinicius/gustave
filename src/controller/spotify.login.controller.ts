import type { Request, Response } from "express";
import { SpotifyLoginService } from "../service/spotify.login.service.js";
import { SpotifyCallbackService } from "../service/spotify.callback.service.js";
import { CallbackDto } from "../service/spotify.callback.dto.js";

export default class SpotifyLoginController {

    public login(_req: Request, res: Response) {
        const spotifyLoginService = new SpotifyLoginService();
        const authUrl = spotifyLoginService.login();
        res.redirect(authUrl.toString());
    }

    public async callback(req: Request, res: Response) {
        try {
            const spotifyCallbackService = new SpotifyCallbackService();
            const code = req.query.code as string | undefined;
            const callbackDto = new CallbackDto(
                code,
            );
            const result = await spotifyCallbackService.callback(callbackDto);
            res.status(200).send(result);

        } catch (err: any) {
            res.status(400).send({
                error: {
                    message: err.message
                }
            });
        }
    }
}