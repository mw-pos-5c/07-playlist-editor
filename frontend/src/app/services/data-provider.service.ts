import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Playlist from "../models/playlist";
import {Observable} from "rxjs";
import Track from "../models/track";
import Genre from "../models/genre";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  backendUrl: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }


  public getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.backendUrl + '/api/playlists');
  }

  public getPlaylistTracks(id: string): Observable<Track[]> {
    return this.http.get<Track[]>(this.backendUrl + '/api/playlisttracks/' + id);
  }

  public getGenreTracks(id: string): Observable<Track[]> {
    return this.http.get<Track[]>(this.backendUrl + '/api/tracks?genreid=' + id);
  }

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.backendUrl + '/api/genres');
  }

  public deletePlaylistTrack(playlistId: string, trackId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.backendUrl}/api/track?playlistid=${playlistId}&trackid=${trackId}`);
  }

  public addTrackToPlaylist(playlistId: string, trackId: string): Observable<boolean> {
    return this.http.post<boolean>(this.backendUrl + '/api/track', {playlistId, trackId});
  }

  public formatDuration(millis: number): string {
    millis /= 1000;
    const h = Math.floor(millis / 3600);
    const m = Math.floor(millis % 3600 / 60);
    const s = Math.floor(millis % 3600 % 60);

    return `${h}h ${m}m ${s}s`;
  }

}
