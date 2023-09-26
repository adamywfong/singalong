
const userInput = $('#user-input');
const resultsContainer = $('#results-container');
const lyricsEls = $('.lyrics-section');
const nextButton = $('.slider-navigation-next');
const prevButton = $('.slider-navigation-previous');
const videoBoxes = $('.video');
let lastSearch;
let favoritesList;
let maxIndex = 2;
let currentIndex = 2;
const videoData = [null, null, null]; 

const keyMusMatch = 'a2175728fd0b1091b79cae95435a1216';
const keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ';

function init() {
  favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
  updateVideoVisibility();
}

function updateVideoVisibility() {
  for (let i = 0; i <= maxIndex; i++) {
    const slide = $(`[data-slider-index="${i}"]`);
    const displayValue = i === currentIndex ? 'block' : 'none';
    slide.css('display', displayValue);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const query = userInput.children().eq(0).val();
  if (query !== '') {
    userInput.children().eq(0).val('');
    fetchMusixmatchData(query);
  }
}

function fetchMusixmatchData(query) {
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${query}&f_has_lyrics=1&s_track_rating=desc&page_size=10&apikey=${keyMusMatch}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      console.error('Error fetching Musixmatch data:', error);
    });
}

function displayResults(data) {
  const trackList = data.message.body.track_list;
  lastSearch = trackList;
  resultsContainer.empty();
  if (!trackList.length) {
    $('#results-container').text('No Results Found');
    return;
  }
  for (let i = 0; i < trackList.length; i++) {
    const resultEl = $(`<button class='button is-rounded is-dark song-option' data-index='${i}'>`);
    const playButton = $('<i class="align-left">');
    resultEl.text(`${trackList[i].track.track_name} by ${trackList[i].track.artist_name}`);
    resultEl.append(playButton);
    resultsContainer.append(resultEl);
  }
}

function handleResultsClick(event) {
  event.preventDefault();
  const clicked = event.target;
  const songClicked = $(clicked).closest('.song-option');
  nextButton.click();
  playSong(songClicked.text());
  showLyrics(parseInt(songClicked.data('index')));
}

function playSong(song) {
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${song}&videoCategoryId=10&key=${keyYT}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const videoId = data.items[0].id.videoId;
      const videoTitle = data.items[0].snippet.title;
      videoData[currentIndex] = { videoID: videoId, videoTitle: videoTitle };
      embed(videoId, videoTitle);
    })
    .catch((error) => {
      console.error('Error fetching YouTube data:', error);
    });
}

function embed(videoId, videoTitle) {
  $(videoBoxes[currentIndex]).empty();
  const favoriteIcon = $('<button class="btn-favorite" data-active="false"> ♡ </button>');
  if (favoritesList.findIndex((item) => item.videoID === videoId) >= 0) {
    favoriteIcon.text('♥');
    favoriteIcon.attr('data-active', 'true');
  }
  const videoEl = $(`<iframe class="has-ratio" src="https://www.youtube.com/embed/${videoId}" title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
  $(videoBoxes[currentIndex]).append(videoEl, favoriteIcon);
}

function handleFavorite(event) {
  event.preventDefault();
  const favoriteIcon = $(event.target);
  const isActive = favoriteIcon.attr('data-active') === 'true';
  if (isActive) {
    favoriteIcon.text('♡');
    favoriteIcon.attr('data-active', 'false');
    const index = favoritesList.findIndex((item) => item.videoID === videoData[currentIndex].videoID);
    if (index !== -1) {
      favoritesList.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    }
  } else {
    favoriteIcon.text('♥');
    favoriteIcon.attr('data-active', 'true');
    favoritesList.push(videoData[currentIndex]);
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
  }
}

function showLyrics(songIndex) {
  const commontrackId = lastSearch[songIndex].track.commontrack_id;
  const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${commontrackId}&apikey=${keyMusMatch}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      $(lyricsEls[currentIndex]).empty();
      const lyricText = data.message.body.lyrics.lyrics_body;
      const copyright = data.message.body.lyrics.lyrics_copyright;
      const lyricSection = $(lyricsEls[currentIndex]);
      lyricSection.html(`<h1>Lyrics</h1><p class="lyrics">${lyricText}</p>`);
      lyricSection.append($('<span class="copyright">').text(copyright));
    })
    .catch((error) => {
      console.error('Error fetching lyrics data:', error);
    });
}

nextButton.click(() => {
  currentIndex += 1;
  if (currentIndex > maxIndex) {
    currentIndex = 0;
  }
  updateVideoVisibility();
});

prevButton.click(() => {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = maxIndex;
  }
  updateVideoVisibility();
});

init();
userInput.on('submit', handleFormSubmit);
resultsContainer.on('click', '.song-option', handleResultsClick);
videoBoxes.on('click', '.btn-favorite', handleFavorite);
