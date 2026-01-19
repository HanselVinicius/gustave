import type { Request, Response } from "express";
import { SpotifyDeleteCommandService } from "../../service/spotify.delete.command.service.js";
import { SpotifyCommunicationMeta } from "../../domain/SpotifyCommunicationMeta.js";
import vine from "@vinejs/vine";
import { deleteSongValidator } from "./validators/delete.song.validator.js";
import { SpotifyListSongQueryService } from "../../service/spotify.list.song.query.service.js";
import { SpotifyListSongQueryDto } from "../../service/dto/spotify.list.song.query.dto.js";

export class SpotifySongController {

    public async delete(_req: Request, res: Response) {
        const songId = _req.params.songId;
        const authHeader = _req.headers['authorization'];

        const data = await vine.validate({
            schema: deleteSongValidator(),
            data: {
                songId: songId,
                authorization: authHeader
            }
        })

        const spotifyCommunicationMeta = new SpotifyCommunicationMeta(data.authorization!);
        const service = new SpotifyDeleteCommandService(spotifyCommunicationMeta);
        await service.execute(songId!.split(","));
        res.status(204).send();
    }

    public async list(_req: Request, res: Response) {
        const authHeader = _req.headers['authorization'];
        const spotifyCommunicationMeta = new SpotifyCommunicationMeta(authHeader!);
        const service = new SpotifyListSongQueryService(spotifyCommunicationMeta);
        const query = new SpotifyListSongQueryDto();

        return res.json(await service.execute(query));
    }

}