import {Component, OnInit} from '@angular/core';
import Playlist from '../../models/playlist';
import {DataProviderService} from '../../services/data-provider.service';
import Track from '../../models/track';

@Component({
  selector: 'app-playlist-editor',
  templateUrl: './playlist-editor.component.html',
  styleUrls: ['./playlist-editor.component.scss']
})
export class PlaylistEditorComponent implements OnInit {

  showAddTrack: boolean = false;
  selectedPlaylist: string = '-1';

  totalPlaytime: string = '0m';

  playlists: Playlist[] = [];
  tracks: Track[] = [];

  constructor(public dataProvider: DataProviderService) {
  }

  ngOnInit(): void {

    this.dataProvider.getPlaylists().subscribe(value => {
      this.playlists = value;
    });
  }

  loadTracks(): void {
    this.dataProvider.getPlaylistTracks(this.selectedPlaylist).subscribe(value => {
      this.tracks = value;
      this.totalPlaytime =
        this.dataProvider.formatDuration(this.tracks.reduce((previousValue, currentValue) => previousValue + +currentValue.milliseconds, 0));

    });
  }

  selectedPlaylistChanged(id: string): void {
    this.selectedPlaylist = id;
    this.loadTracks();
  }

  deleteTrackFromPlaylist(id: string) {
    this.dataProvider.deletePlaylistTrack(this.selectedPlaylist, id).subscribe(value => {
      this.loadTracks();
    });
  }

  addTrackSelected(id: string): void {

    if (this.selectedPlaylist === '-1') return;
    this.showAddTrack = false;
    this.dataProvider.addTrackToPlaylist(this.selectedPlaylist, id).subscribe(value => {
      this.loadTracks();
    })

  }


}
