import axios from "axios";
import { SpotifyListSongQueryDto } from "./dto/spotify.list.song.query.dto.js";
import { SpotifyCommunicationMeta } from "../domain/SpotifyCommunicationMeta.js";
import { AppResponse } from "../domain/AppResponse.js";
import { Song } from "../domain/Song.js";

export class SpotifyListSongQueryService {

    constructor(private readonly spotifyCommunicationMeta: SpotifyCommunicationMeta) { }

    public async execute(query: SpotifyListSongQueryDto): Promise<AppResponse<Song[]>> {
        const spotifyApiUrl = process.env.SPOTIFY_API_URL;
        const spotifyApiResult = await axios.get(`${spotifyApiUrl}/v1/me/tracks`, {
            headers: {
                Authorization: 'Bearer ' + this.spotifyCommunicationMeta.accessToken
            },
            params: {
                limit: query.limit,
                offset: query.offset
            }
        });

        const result: Song[] = [];
        spotifyApiResult.data.items.forEach((item: { track: Song }) => {
            result.push({
                id: item.track.id,
                name: item.track.name
            })
        });

        const response: AppResponse<Song[]> = AppResponse.build(result,
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