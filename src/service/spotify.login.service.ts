export class SpotifyLoginService {


    public login(): URL {
        const scope = [
            "playlist-read-private",
            "playlist-modify-public",
            "playlist-modify-private",
        ].join(" ");

        const clientId = process.env.SPOTIFY_CLIENT_ID as string;
        const redirectUri = process.env.REDIRECT_URI as string;
        const spotifyLoginUrl = process.env.SPOTIFY_AUTH_URL as string;

        const authUrl = new URL(`${spotifyLoginUrl}/authorize`);
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append("client_id", clientId);
        authUrl.searchParams.append("scope", scope);
        authUrl.searchParams.append("redirect_uri", redirectUri);

        return authUrl;
    }

}