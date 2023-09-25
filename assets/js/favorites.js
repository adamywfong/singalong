var favoritesList;
var favoritesContainer = document.getElementById("favorites-list")

function init() {
    favoritesList = localStorage.getItem("favorites");
    if (favoritesList) {
        favoritesList = JSON.parse(favoritesList);
        console.log (favoritesList);
    } else {
        favoritesList = [];
    }
}

function displayFavorites() {
    var favoritesContainer = document.getElementById("favorites-list");
    favoritesContainer.innerHTML = "";

    if (favoritesList.length > 0) {
        for (var i=0; i<favoritesList.length;i++) {
            var listItem = document.createElement("li");
            var video = document.createElement("iframe");
            var button = document.createElement("button");
            video.setAttribute("class", "has-ratio");
            video.setAttribute("src", "https://www.youtube.com/embed/" + favoritesList[i].videoID);
            video.setAttribute("title", favoritesList[i].videoTitle);
            video.setAttribute("frameborder", 0);
            video.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            button.setAttribute("class","button is-danger btn-remove");
            button.textContent("X");
            listItem.append(video);
            listItem.append(button);
            favoritesContainer.append(listItem);
        }
    } else {
        favoritesContainer.innerHTML = "You have no favorite songs yet.";
    }
}

window.addEventListener("click", )

// Call the init function when the favorites.html page loads
window.addEventListener("load", function () {
    init();
    displayFavorites();
});
