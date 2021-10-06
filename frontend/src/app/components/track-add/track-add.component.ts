import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Genre from '../../models/genre';
import {DataProviderService} from '../../services/data-provider.service';
import Track from '../../models/track';

@Component({
  selector: 'app-track-add',
  templateUrl: './track-add.component.html',
  styleUrls: ['./track-add.component.scss']
})
export class TrackAddComponent implements OnInit {

  @Output() trackSelected = new EventEmitter<string>();

  selectedGenre: string = '-1';
  selectedTrack: string = '-1';

  genres: Genre[] = [];
  tracks: Track[] = [];


  constructor(private dataProvider: DataProviderService) {
  }


  ngOnInit(): void {
    this.dataProvider.getGenres().subscribe(value => {
      this.genres = value;
    })
  }

    selectedGenreChanged(id: string): void {
    this.selectedGenre = id;
    this.dataProvider.getGenreTracks(this.selectedGenre).subscribe(value => {
      this.selectedTrack = '-1';
      this.tracks = value;
    })
  }

  selectedTrackChanged(): void {

  }

  addTrack(): void {
    this.trackSelected.emit(this.selectedTrack);
    this.selectedTrack = '-1';
    this.selectedGenre = '-1';
  }

}
