var userInput = $('#user-input');
var resultsContainer = $('#results-container');
var lyricsEl = $('#lyrics-container');

//api keys for easy replacement if limits are exceeded
var keyMusMatch = 'a2175728fd0b1091b79cae95435a1216' + 'buffer'; 
var keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ'+'buffer';
var lastSearch;

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
    userInput.children().eq(0).val('');
    fetch('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q=' + query + '&page_size=4&s_track_rating=desc&apikey=' + keyMusMatch)
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

function displayResults(data) {
    console.log(data);
    lastSearch = data;
    if (data.track_list.length){
        for (var i=0; i < data.track_list.length; i++) {
            var resultEl = $("<li class='song-option' data-index='" + i +"'>");
            resultEl.text(data.track_list[i].track_name);
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