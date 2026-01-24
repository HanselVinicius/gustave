export class SpotifyDeleteSongDto {


    public readonly songIdParam: string[] | undefined

    constructor(
        public readonly songIdBody: { songId: string; }[] | undefined,
        songIdParam: string | undefined
    ) {
        if (songIdParam) {
            this.songIdParam = songIdParam.split(',');
        }
    }
}