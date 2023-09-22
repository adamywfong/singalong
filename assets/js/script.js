var userInput = $('#user-input');
var resultsContainer = $('#results-container');
var lyricsEl = $('#lyrics-section');
//placeholder for HTML element that will hold the Youtube video
var videoBox = $('#video');
var lastSearch;
var favoritesList;

//api keys for easy replacement if limits are exceeded
var keyMusMatch = 'a2175728fd0b1091b79cae95435a1216'; 
var keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ'+'buffer';

//required format for API calls for reference
//http://api.musixmatch.com/ws/1.1/track.search?q={query}&apikey={keyMusMatch}&s_track_rating=asc
//http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id={result.track_id}&apikey={keyMusMatch}

//Add this url to start of fetch urls to fix cors issues||You may need to navigate to the site first and click a button
//https://cors-anywhere.herokuapp.com/

//Pseudocode for expected required functionality
// function init() {

// }

function handleFormSubmit(event) {
    event.preventDefault();
    var query = $(userInput).children().eq(0).val();
    if (query!=='') {
        userInput.children().eq(0).val('');
        fetch('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=' + query + '&f_has_lyrics=1&s_track_rating=desc&page_size=10&apikey=' + keyMusMatch)
            .then(function(response){
                if (!response.ok) {
                    throw response.json();
                }
                return response.json();
            })
            .then(function(data) {
                displayResults(data);
            });
    }
}

function displayResults(data) {
    var trackList = data.message.body.track_list;
    lastSearch = trackList;
    if (!trackList.length){
        return;
    } else {
        for (var i=0; i < trackList.length; i++) {
            var resultEl = $("<li class='song-option' data-index='" + i +"'>");
            var playButton = $("<i class='align-left'>")
            resultEl.text(trackList[i].track.track_name + ' by ' + trackList[i].track.artist_name);
            resultEl.append(playButton);
            $('#results-container').append(resultEl);
        }
    }
}

function handleResultsClick(event) {
    event.preventDefault()
    clicked = event.target;
    // playSong(clicked.song);
    // showLyrics(clicked.dataset.index);
}

function playSong(song) {
    fetch('https://www.googleapis.com/youtube/v3/search?part=snipper&type=video&q=' + song + '&videoCategoryId=10&key=' +keyYT)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            embed(data.items[0].id.videoId, data.items[0].snippet.title);
        });
}

function embed(videoId, videoTitle) {
    var videoEl = $('<iframe class="iframe" src = "https://www.youtube.com/embed/' + videoId + '" title="' + videoTitle + '"');
    videoBox.append(videoEl);
}

function showLyrics(songindex) {
    fetch('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=' + lastSearch[songindex].track.commontrack_id + '&apikey=' + keyMusMatch)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            lyricsEl.html('');
            var lyricText = data.body.lyrics.lyrics_body;
            var copyright = data.body.lyrics.lyrics_copyright;
            var copyrightMessage = $('<span class="copyright">'); 
            lyricsEl.text(lyricText);
            copyrightMessage.text(copyright);
            lyricsEl.append(copyright);
        });
}

// init();
userInput.on('submit', handleFormSubmit);
resultsContainer.on('click','.song-option', handleResultsClick)