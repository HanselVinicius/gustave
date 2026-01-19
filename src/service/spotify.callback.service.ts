import axios from "axios";
import type { CallbackDto } from "./dto/spotify.callback.dto.js";
import { AppResponse } from "../domain/AppResponse.js";

export class SpotifyCallbackService {

    public async callback(callbackDto: CallbackDto): Promise<AppResponse<{
        access_token: string;
        refresh_token: string;
    }>> {
        if (!callbackDto.code) {
            throw new Error("code");
        }

        const clientId = process.env.SPOTIFY_CLIENT_ID as string;
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
        const redirectUri = process.env.REDIRECT_URI as string;
        const spotifyLoginUrl = process.env.SPOTIFY_AUTH_URL as string;

        const tokenResponse = await axios.post(
            `${spotifyLoginUrl}/api/token`,
            new URLSearchParams({
                grant_type: "authorization_code",
                code: callbackDto.code,
                redirect_uri: redirectUri,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " +
                        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
                },
            }
        );

        const response: AppResponse<{
            access_token: string;
            refresh_token: string;
        }> = AppResponse.build(tokenResponse.data as {
            access_token: string;
            refresh_token: string;
        },
            {
                _links: {
                    next: { href: "/spotify/songs" }
                }
            }
        )

        return response
    }

}