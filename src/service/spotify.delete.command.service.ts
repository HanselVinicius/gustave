import axios from "axios";
import type { SpotifyCommunicationMeta } from "../domain/SpotifyCommunicationMeta.js";

export class SpotifyDeleteCommand {

    constructor(public spotifyCommunicationMeta: SpotifyCommunicationMeta) { }


    async execute(songIds: string[]) {
        const spotifyApiUrl = process.env.SPOTIFY_API_URL;
        const result =await axios.delete(`${spotifyApiUrl}/me/tracks?ids=${songIds.join(',')}`);
        return result;
    }

}