var userInput = $('#user-input');
var resultsContainer = $('#results-container');
var lyricsEl = $('#lyrics-container');

//api keys for easy replacement if limits are exceeded
var keyMusMatch = 'a2175728fd0b1091b79cae95435a1216'+'buffer'; 
var keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ'+'buffer';
var lastSearch;

//required format for API calls for reference
//http://api.musixmatch.com/ws/1.1/track.search?q={query}&apikey={keyMusMatch}&s_track_rating=asc
//http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id={result.track_id}&apikey={keyMusMatch}


//Pseudocode for expected required functionality

// function handleFormSubmit() {
//     var query = $('#text-submission').val();
//     fetch('http://api.musixmatch.com/ws/1.1/track.search?q=' + query + '&s_track_rating=desc&apikey=' + keyMusMatch)
//         .then(function(response){
//             if (!response.ok) {
//                 throw response.json();
//             }
//             return response.json();
//         })
//         .then(function(data) {
//             diplayResults(data);
//         });
// }

// function diplayResults(data) {
//     console.log(data);
//     lastSearch = data;
//     for (var i=0; i < data.track_list.length; i++) {
//         var resultEl = $('<div>');
//         resultEl.text(data.track_list[i].track_name);
//         $('#results-container').append(resultEl);
//     }
// }

// function handleResultsClick(event) {
//     event.preventDefault()
//     clicked = event.target;
//     if (!clicked == result) {
//         break;
//     } else {
//         playSong(clicked.song);
//         showLyrics(clicked.index);
//     }
// }

// function playSong(song) {
//     fetch('youtube api request')
//         .then(function(response) {
//             if (!response.ok) {
//                 throw response.json();
//             }
//             return response.json();
//         })
//         .then(function(data) {
//             embed data.video;
//             play data.video;
//         });
// }

//function showLyrics(songindex) {
//     fetch('http://api.musixmatch.com/ws/1.1/tracklyrics.get?commontrack_id=' + lastSearch.track_list[songindex].commontrack_id + '&apikey=' + keyMusMatch)
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
//}

userInput.on('submit', handleFormSubmit);
resultsContainer.on('click','.btn-play', handleResultsClick)