import type { Request, Response } from "express";
import { SpotifyDeleteCommandService } from "../../service/spotify.delete.command.service.js";
import { SpotifyCommunicationMeta } from "../../domain/SpotifyCommunicationMeta.js";
import vine from "@vinejs/vine";
import { deleteSongValidator } from "./validators/delete.song.validator.js";
import { SpotifyListSongQueryService } from "../../service/spotify.list.song.query.service.js";
import { SpotifyListSongQueryDto } from "../../service/dto/spotify.list.song.query.dto.js";
import { listSongQueryValidator } from "./validators/list.song.query.validators.js";
import { SpotifyDeleteSongDto } from "../../service/dto/spotify.delete.song.dto.js";

export class SpotifySongController {

    public async delete(_req: Request, res: Response) {
        const songId = _req.query.songIds;
        const authHeader = _req.headers['authorization'];
        const { songIds } = _req.body;

        const data = await vine.validate({
            schema: deleteSongValidator(),
            data: {
                songParamId: songId,
                authorization: authHeader,
                songBodyIds: songIds
            }
        });

        const spotifyCommunicationMeta = new SpotifyCommunicationMeta(data.authorization!);
        const service = new SpotifyDeleteCommandService(spotifyCommunicationMeta);
        const dto = new SpotifyDeleteSongDto(data.songBodyIds, data.songParamId)
        await service.execute(dto);
        res.status(204).send();
    }

    public async list(_req: Request, res: Response) {
        const authHeader = _req.headers['authorization'];
        const { limit, offset } = _req.query;
        const spotifyCommunicationMeta = new SpotifyCommunicationMeta(authHeader!);
        const service = new SpotifyListSongQueryService(spotifyCommunicationMeta);
        const data = await vine.validate({
            schema: listSongQueryValidator(),
            data: {
                limit: limit,
                offset: offset,
                authorization: authHeader
            }
        });
        const query = new SpotifyListSongQueryDto(data.limit, data.offset);

        return res.json(await service.execute(query));
    }

}