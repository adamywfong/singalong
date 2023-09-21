var userInput = $('#user-input');
var resultsContainer = $('#results-container');
var lyricsEl = $('#lyrics-section');
var lastSearch;
var favoritesList;

//api keys for easy replacement if limits are exceeded
var keyMusMatch = 'a2175728fd0b1091b79cae95435a1216'; 
var keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ'+'buffer';

//required format for API calls for reference
//http://api.musixmatch.com/ws/1.1/track.search?q={query}&apikey={keyMusMatch}&s_track_rating=asc
//http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id={result.track_id}&apikey={keyMusMatch}

//Add this url to start of fetch urls to fix cors issues
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

// function playSong(song) {
//     fetch('https://www.googleapis.com/youtube/v3/search?type=video&q=' + song + '&videoCategoryId=10&key=' +keyYT)
//         .then(function(response) {
//             if (!response.ok) {
//                 throw response.json();
//             }
//             return response.json();
//         })
//         .then(function(data) {
//             embed(data.items[0].id.videoId);
//         });
// }

// function showLyrics(songindex) {
//     fetch('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/tracklyrics.get?commontrack_id=' + lastSearch.track_list[songindex].commontrack_id + '&apikey=' + keyMusMatch)
//         .then(function(response){
//             if (!response.ok) {
//                 throw response.json();
//             }
//             return response.json();
//         })
//         .then(function(data) {
//             display data.lyrics_body;
//             display data.lyrics_copyright                
//         });
// }

// init();
userInput.on('submit', handleFormSubmit);
resultsContainer.on('click','.song-option', handleResultsClick)