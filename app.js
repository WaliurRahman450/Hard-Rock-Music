const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;

    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch(error){
        displayError('something went wrong!!! please try again later.')
    }
}
const displaySongs = songs => {
    const songContainer = document.getElementById('songContainer');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
                
                
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div> `
        songContainer.appendChild(songDiv);
        // console.log(song)
    });
}
const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Something Went Wrong!!! Please Try Again');
    }


}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('songLyrics');
    lyricsDiv.innerText = lyrics;
    console.log(lyrics)
}
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}