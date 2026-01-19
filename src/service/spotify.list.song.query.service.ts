import axios from "axios";
import { SpotifyListSongQueryDto } from "./dto/spotify.list.song.query.dto.js";
import { SpotifyCommunicationMeta } from "../domain/SpotifyCommunicationMeta.js";
import { AppResponse } from "../domain/AppResponse.js";

export class SpotifyListSongQueryService {

    constructor(private readonly spotifyCommunicationMeta: SpotifyCommunicationMeta) { }

    public async execute(query: SpotifyListSongQueryDto) {
        const spotifyApiUrl = process.env.SPOTIFY_API_URL;
        const spotifyApiResult = await axios.get(`${spotifyApiUrl}/v1/me/tracks`, {
            headers: {
                Authorization: 'Bearer ' + this.spotifyCommunicationMeta.accessToken
            }
        });

        const result: any[] = [];
        spotifyApiResult.data.items.forEach((item: any) => {
            result.push({
                name: item.track.name,
                songId: item.track.id
            })
        });

        const response: AppResponse<any> = AppResponse.build(result,
            {
                _links: {
                    self: { "href": "/spotify/songs" },
                    "ea:delete": { href: "/spotify/songs/:songId" }
                }
            }
        )

        return response;
    }

} 