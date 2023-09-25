var favoritesList;
var favoritesContainer = document.getElementById("favorites-list");
var backButton = document.getElementById("btn-back");

//On init gets favoritesList
function init() {
    favoritesList = localStorage.getItem("favorites");
    if (favoritesList) {
        favoritesList = JSON.parse(favoritesList);
    } else {
        favoritesList = [];
    }
}

//Displays contents of favorites list as embedded Youtube videos
function displayFavorites() {
    favoritesContainer.innerHTML = "";
    if (favoritesList.length > 0) {
        for (var i=0; i<favoritesList.length;i++) {
            var listItem = document.createElement("li");
            var video = document.createElement("iframe");
            var button = document.createElement("button");
            video.setAttribute("class", "has-ratio video");
            video.setAttribute("src", "https://www.youtube.com/embed/" + favoritesList[i].videoID);
            video.setAttribute("title", favoritesList[i].videoTitle);
            video.setAttribute("frameborder", 0);
            video.setAttribute("data-index", i );
            video.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            button.setAttribute("class","button is-danger btn-remove");
            button.textContent = "X";
            listItem.append(video);
            listItem.append(button);
            favoritesContainer.append(listItem);
        }
    } else {
        favoritesContainer.innerHTML = "You have no favorite songs yet.";
    }
}

//When X is clicked removes item from favorites list
favoritesContainer.addEventListener("click", function(event) {
    var clicked = event.target;
    if (clicked.matches(".btn-remove")) {
        var videoIndex = parseInt(clicked.previousSibling.dataset.index);
        favoritesList.splice(videoIndex,1);
        localStorage.setItem("favorites", JSON.stringify(favoritesList));
        displayFavorites();
    }
})

// Call the init function when the favorites.html page loads and displays current favorites
window.addEventListener("load", function () {
    init();
    displayFavorites();
});
