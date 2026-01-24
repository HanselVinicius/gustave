import axios from "axios";
import type { SpotifyCommunicationMeta } from "../domain/SpotifyCommunicationMeta.js";
import { SpotifyDeleteSongDto } from "./dto/spotify.delete.song.dto.js";

export class SpotifyDeleteCommandService {

    constructor(public spotifyCommunicationMeta: SpotifyCommunicationMeta) { }

    async execute(spotifyDeleteSongDto: SpotifyDeleteSongDto) {
        const spotifyApiUrl = process.env.SPOTIFY_API_URL;
        if (spotifyDeleteSongDto.songIdParam && spotifyDeleteSongDto.songIdParam.length > 0) {
            const result = await axios.delete(`${spotifyApiUrl}/v1/me/tracks?ids=${spotifyDeleteSongDto.songIdParam.join(',')}`, {
                headers: {
                    Authorization: 'Bearer ' + this.spotifyCommunicationMeta.accessToken
                }
            });
            return result;
        }


        const result = await axios.delete(`${spotifyApiUrl}/v1/me/tracks`, {
            headers: {
                Authorization: 'Bearer ' + this.spotifyCommunicationMeta.accessToken,
            },
            data: {
                ids: spotifyDeleteSongDto.songIdBody?.map((songId) => songId.songId)
            }
        });

        return result;


    }
}