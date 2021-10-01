import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PlaylistEditorComponent} from './components/playlist-editor/playlist-editor.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TrackAddComponent} from './components/track-add/track-add.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistEditorComponent,
    TrackAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
