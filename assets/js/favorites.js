var favoritesList;

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
            video.setAttribute("class", "has-ratio");
            video.setAttribute("src", "https://www.youtube.com/embed/" + favoritesList[i].videoID);
            video.setAttribute("title", favoritesList[i].videoTitle);
            video.setAttribute("frameborder", 0);
            video.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        // '<iframe class= "has-ratio" src ="https://www.youtube.com/embed/' + favoritesList[i].videoID + '" title="' + favoritesList[i].videoTitle + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>'
            listItem.append(video);
            favoritesContainer.append(listItem);
        }
        // favoritesList.forEach(function (songIndex) {
        //     var song = lastSearch[songIndex].track;
        //     var listItem = document.createElement("li");
        //     listItem.textContent = song.track_name + " by " + song.artist_name;
        //     favoritesContainer.appendChild(listItem);
        // });
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
