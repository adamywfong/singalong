
var keyMusMatch = 'a2175728fd0b1091b79cae95435a1216';
var keyYT = 'AIzaSyBRuDvIUX8S79zEXDUNkaqpftfEY7jjaNQ';

// Define your functions here
function handleFormSubmit(event) {
    event.preventDefault();
    // Implement API call logic here
}

function diplayResults(data) {
    console.log(data);
    lastSearch = data;
    // Implement displaying results logic here
}

function handleResultsClick(event) {
    event.preventDefault();
    // Implement handling click on results logic here
}

function playSong(song) {
    // Implement playing a song logic here
}

function showLyrics(songindex) {
    // Implement displaying lyrics logic here
}

// Your existing code for the carousel
const carousel = document.querySelector('.carousel');
// ... (carousel code)

// Your event listeners for form submission and results click
userInput.on('submit', handleFormSubmit);
resultsContainer.on('click', '.btn-play', handleResultsClick);

// JavaScript for the image carousel
const karaokeCarousel = new bootstrap.Carousel(document.getElementById('karaokeCarousel'));
const lyricsCarousel = new bootstrap.Carousel(document.getElementById('lyrics-section'));

// Automatically advance to the next slide every 3 seconds (adjust as needed)
setInterval(() => {
    karaokeCarousel.next();
    lyricsCarousel.next();
}, 3000);
