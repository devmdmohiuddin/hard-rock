document.getElementById("search-btn").addEventListener("click", () => {
  const searchText = document.getElementById("input-search").value;
  const url = ` https://api.lyrics.ovh/suggest/${searchText}`;

  try {
    const fetchSearchText = async () => {
      const response = await fetch(url);
      const { data } = await response.json();
      displaySongDetails(data);
    };
    fetchSearchText();
    displayLoader(true)
  } catch (err) {
    console.log(err);
  }
});

document.getElementById('search-box').addEventListener('keypress', function(event) {
  const searchBtn = document.getElementById('search-btn')
  const searchText = document.getElementById("input-search").value;

  if (searchText !== '') {
    if (event.key === 'Enter' ) {
      searchBtn.click()
    }
  }
  
})

const displaySongDetails = songs => {
  let html = "";
  songs.forEach(
    song =>
      (html += `
      <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
              <source src=${song.preview} type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" lyrics-btn class="btn btn-success">Get Lyrics</button>
        </div>
      </div>
    `)
  );
  displayLoader()
  document.getElementById("song-wrapper").innerHTML = html;
};

const getLyrics = (artist, title) => {
  try {
    const fetchLyrics = async () => {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
      );
      const data = await response.json();
      displayLyrics(data.lyrics);
    };

    fetchLyrics();
  } catch (err) {
    console.log(err);
  }
};

const displayLyrics = lyrics => {
  document.getElementById("lyrics-song").innerText = lyrics;
};

const displayLoader = () => {
  const loader = document.querySelector('.spinner-border');
  const songs = document.getElementById('song-wrapper');
  
  loader.classList.toggle('d-none')
  songs.classList.toggle('d-none')
  
}
