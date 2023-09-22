var favoritesList;

function init() {
    favoritesList = localStorage.getItem("favorites");
    if (favoritesList) {
        favoritesList = JSON.parse(favoritesList);
    } else {
        favoritesList = [];
    }
}

function displayFavorites() {
    var favoritesContainer = document.getElementById("favorites-list");
    favoritesContainer.innerHTML = "";

    if (favoritesList.length > 0) {
        favoritesList.forEach(function (songIndex) {
            var song = lastSearch[songIndex].track;
            var listItem = document.createElement("li");
            listItem.textContent = song.track_name + " by " + song.artist_name;
            favoritesContainer.appendChild(listItem);
        });
    } else {
        favoritesContainer.innerHTML = "You have no favorite songs yet.";
    }
}

function addToFavorites(songIndex) {
    if (!favoritesList.includes(songIndex)) {
        favoritesList.push(songIndex);
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
        displayFavorites();
    }
}

// Call the init function when the favorites.html page loads
window.addEventListener("load", function () {
    init();
    displayFavorites();
});
