export class SpotifyListSongQueryDto {
    constructor(
        public readonly limit:number,
        public readonly offset:number
    ) { }
}