
let favoritesList = [];
const favoritesContainer = document.getElementById("favorites-list");
const backButton = document.getElementById("btn-back");


function init() {
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favoritesList = JSON.parse(storedFavorites);
  }
}


function displayFavorites() {
  favoritesContainer.innerHTML = "";
  if (favoritesList.length > 0) {
    favoritesList.forEach((favorite, index) => {
      const listItem = document.createElement("li");
      const video = createVideoElement(favorite.videoID, favorite.videoTitle, index);
      const button = createRemoveButton(index);
      
      listItem.appendChild(video);
      listItem.appendChild(button);
      favoritesContainer.appendChild(listItem);
    });
  } else {
    favoritesContainer.textContent = "You have no favorite songs yet.";
  }
}


function createVideoElement(videoID, videoTitle, index) {
  const video = document.createElement("iframe");
  video.className = "has-ratio video";
  video.src = `https://www.youtube.com/embed/${videoID}`;
  video.title = videoTitle;
  video.frameborder = 0;
  video.dataset.index = index;
  video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  return video;
}


function createRemoveButton(index) {
  const button = document.createElement("button");
  button.className = "button is-danger btn-remove";
  button.textContent = "X";
  button.addEventListener("click", () => removeFavorite(index));
  return button;
}


function removeFavorite(index) {
  favoritesList.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favoritesList));
  displayFavorites();
}

window.addEventListener("load", function () {
  init();
  displayFavorites();
});
