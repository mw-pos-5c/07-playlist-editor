import express from 'express';
import cors from 'cors';
import DataStore from './DataStore';
import PlaylistTrack from './models/PlaylistTrack';

const app = express();
const store = new DataStore();

app.use(express.json());
app.use(cors());

store.parse()

app.get('/api/playlists', (req, res) => {
    res.json(store.playlists);
});

app.get('/api/playlisttracks/:id', (req, res) => {
    const id = req.params.id;
    const trackIds = store.playlistTracks.filter(value => value.playlistId == id);
    const tracks = store.tracks.filter(value => trackIds.find(x => x.trackId === value.id))
    tracks.sort((a, b) => a.name > b.name ? 1 : -1);
    res.json(tracks);
});

app.get('/api/genres', (req, res) => {
    res.json(store.genres);
});

app.get('/api/tracks', (req, res) => {
    const id = req.query.genreid;
    if (id === undefined) {
        res.sendStatus(404);
        return;
    }
    res.json(store.tracks.filter(value => value.genreId === id));
});

app.post('/api/track', (req, res) => {
    const track: PlaylistTrack = req.body;
    store.playlistTracks.push(track);
    res.json(track);
});

app.delete('/api/track', (req, res) => {
    const pId = req.query.playlistid;
    const tId = req.query.trackid;
    const id = store.playlistTracks.findIndex(value => value.playlistId === pId && value.trackId === tId);
    store.playlistTracks.splice(id, 1);
    res.json(true);
});


app.listen(8000, () => {
    console.log('Listening...')
});