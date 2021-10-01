import fs from 'fs';
import Playlist from './models/Playlist';
import PlaylistTrack from './models/PlaylistTrack';
import Genre from './models/Genre';
import Track from './models/Track';


export default class DataStore {

    playlists: Playlist[] = [];
    playlistTracks: PlaylistTrack[] = [];
    genres: Genre[] = [];
    tracks: Track[] = [];

    parse(): void {
        this.playlists = <Playlist[]>this.loadCsv('csv/playlist.csv', ['id', 'name']);
        this.playlistTracks = <PlaylistTrack[]>this.loadCsv('csv/playlist-track.csv', ['playlistId', 'trackId']);
        this.genres = <Genre[]>this.loadCsv('csv/genre.csv', ['id', 'name']);
        this.tracks = <Track[]>this.loadCsv('csv/track.csv',
            [
                'id',
                'name',
                'albumId',
                'mediaTypeId',
                'genreId',
                'composer',
                'milliseconds',
                'bytes',
                'unitPrice']);
    }

    loadCsv(filename: string, headers: string[]): unknown[] {
        const lines = fs.readFileSync(filename).toString().replace(/"/g, '').split('\n');
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].split(',');
            if (line.length !== headers.length) continue;
            const obj: any = {};
            for (let j = 0; j < line.length; j++) {
                obj[headers[j]] = line[j];
            }
            result.push(obj);
        }
        return result;

    }

}