import axios from "axios";
import type { SpotifyCommunicationMeta } from "../domain/SpotifyCommunicationMeta.js";

export class SpotifyDeleteCommandService {

    constructor(public spotifyCommunicationMeta: SpotifyCommunicationMeta) { }

    async execute(songIds: string[]) {
        const spotifyApiUrl = process.env.SPOTIFY_API_URL;
        const result = await axios.delete(`${spotifyApiUrl}/v1/me/tracks?ids=${songIds.join(',')}`, {
            headers: {
                Authorization: 'Bearer '+this.spotifyCommunicationMeta.accessToken
            }
        });

        return result;
    }
}