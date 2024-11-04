// Playlist Collection
class Playlist {
  constructor() {
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  getIterator() {
    return new PlaylistIterator(this);
  }
}

// Playlist Iterator
class PlaylistIterator {
  constructor(playlist) {
    this.playlist = playlist;
    this.currentIndex = 0;
  }

  hasNext() {
    return this.currentIndex < this.playlist.songs.length;
  }

  next() {
    if (this.hasNext()) {
      return this.playlist.songs[this.currentIndex++];
    }
    return null;
  }

  hasPrevious() {
    return this.currentIndex > 0;
  }

  previous() {
    if (this.hasPrevious()) {
      return this.playlist.songs[--this.currentIndex];
    }
    return null;
  }
}

// Client Code
const playlist = new Playlist();
playlist.addSong("Song A");
playlist.addSong("Song B");
playlist.addSong("Song C");

const iterator = playlist.getIterator();

console.log("Forward Iteration:");
while (iterator.hasNext()) {
  console.log(`Playing: ${iterator.next()}`);
}

console.log("Backward Iteration:");
while (iterator.hasPrevious()) {
  console.log(`Playing: ${iterator.previous()}`);
}
