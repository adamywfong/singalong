var userInput = $('#user-input');
var resultsContainer = $('#results-container');
var lyricsEls = $('.lyrics-section');
//placeholder for HTML element that will hold the Youtube video
var videoBoxes = $('.video');
var lastSearch;
var favoritesList;
var videoNum = 2;

//api keys for easy replacement if limits are exceeded
var keyMusMatch = 'a2175728fd0b1091b79cae95435a1216'; 
var keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ';

//required format for API calls for reference
//http://api.musixmatch.com/ws/1.1/track.search?q={query}&apikey={keyMusMatch}&s_track_rating=asc
//http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id={result.track_id}&apikey={keyMusMatch}

//Add this url to start of fetch urls to fix cors issues
//You may need to navigate to the site first and click a button
//Remove before final deplayment
//https://cors-anywhere.herokuapp.com/


function init() {
    favoritesList = localStorage.getItem("favorites");
    if (favoritesList) {
        favoritesList = JSON.parse(favoritesList);
    } else {
        favoritesList = [];
    }
}

//When search is submitted, queries musixmatch and returns tracks with the search term in either the author or track name
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

//Displays results of search
function displayResults(data) {
    var trackList = data.message.body.track_list;
    lastSearch = trackList;
    resultsContainer.empty();
    if (!trackList.length){
        $('#results-container').text('No Results Found');
        return;
    } else {
        for (var i=0; i < trackList.length; i++) {
            var resultEl = $("<button class='button is-rounded is-dark song-option' data-index='" + i +"'>");
            var playButton = $("<i class='align-left'>");
            resultEl.text(trackList[i].track.track_name + ' by ' + trackList[i].track.artist_name);
            resultEl.append(playButton);
            $('#results-container').append(resultEl);
        }
    }
}

//When a search result is clicked, displays a youtube video and the lyrics of the result
function handleResultsClick(event) {
    event.preventDefault();
    clicked = event.target;
    songClicked = clicked.closest('.song-option');
    videoNum = (videoNum + 1)%3;
    playSong(songClicked.textContent);
    showLyrics(parseInt(songClicked.dataset.index));
    updateSlide();
}

//searches for a song on youtube and displays the video
function playSong(song) {
    fetch('https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=' + song + '&videoCategoryId=10&key=' +keyYT)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data.items[0]);
            embed(data.items[0].id.videoId, data.items[0].snippet.title);
        });
}

//creates an embedded video onto index.html
function embed(videoId, videoTitle) {
    $(videoBoxes[videoNum]).empty();
    var favoriteIcon = $('<button class="btn-favorite" data-active="false"> ♡ </i>');
    var videoEl = $('<iframe class= "has-ratio" src ="https://www.youtube.com/embed/' + videoId + '" title="' + videoTitle + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>');
    $(videoBoxes[videoNum]).append(videoEl, favoriteIcon);
}

function handleFavorite(event) {
    event.preventDefault();
    var clicked = event.target;
    var favorite = clicked.closest('.btn-favorite');
    if (favorite.dataset.active == "true") {
        favorite.dataset.active = "false";
        $(favorite).text('♡');
        // TODO: remove video from favorites
        // TODO: set updated favorites in localStorage
    } else {
        $(favorite).text('♥');
        favorite.dataset.active = "true";
        //TODO: add video to favorites
        //TODOL set updated favorites in localStorage
    }
}

//displays the lyrics of a given searchresult
function showLyrics(songindex) {
    fetch('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=' + lastSearch[songindex].track.commontrack_id + '&apikey=' + keyMusMatch)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            $(lyricsEls[videoNum]).empty();
            var lyricText = data.message.body.lyrics.lyrics_body;
            var copyright = data.message.body.lyrics.lyrics_copyright;
            var copyrightMessage = $('<span class="copyright">');
            $(lyricsEls[videoNum]).html('<h1>Lyrics</h1>' + '<p class="lyrics">' + lyricText + '</p>');
            copyrightMessage.text(copyright);
            $(lyricsEls[videoNum]).append(copyright);
        });
}


function updateSlide() {
	for (var i = 0; i<=2; i++){
		var slide = $('[data-slider-index="' + i + '"]');
		if (i==videoNum) {
			slide.css("display", "block");
		} else {
			slide.css("display", "none");
		}
	}
};

// init();
userInput.on('submit', handleFormSubmit);
resultsContainer.on('click','.song-option', handleResultsClick)
videoBoxes.on('click', '.btn-favorite', handleFavorite);