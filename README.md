# Singalong - Best Karaoke Page Ever!

![Singalong Screenshot](![image.png](assets/images/Screenshot3.png))

**Singalong** is an interactive karaoke website that allows users to enjoy karaoke-style music and lyrics. Users can search for their favorite songs, view lyrics, and sing along to their chosen tracks. The project incorporates a colorful design and an image carousel to enhance the user experience, utilizing the MusixMatch API and YouTube API to populate user-requested videos of songs and lyrics to sing along with. Users can also favorite their favorite songs and view them in the favorites tab.

**Link to site:** [Singalong Karaoke](https://adamywfong.github.io/singalong/)

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [APIs](#apis)
- [License](#license)

## Features
- Search for songs and view their lyrics.
- Enjoy a visually appealing design with unicorn-themed colors.
- Sing along to music while viewing lyrics.
- Navigate through images with an interactive image carousel.
- Automatic slideshow feature in the image carousel.

## Getting Started
This webpage will be loaded, but Node.js might be required if the user does not have it installed already to initialize the Bulma plugin.

## Usage
1. Open the project in a web browser.
2. Use the search bar in the upper right corner to look for your favorite songs.
3. Click on a search result to view the song's lyrics and start singing along.
4. Enjoy the visually appealing design and the interactive image carousel.

**Screenshot of page on load:**
![Screenshot of page on load](./assets/images/Screenshot1.png)

If you input a search term, results will populate on the page in the form of buttons which can be selected.

**Screenshot of page after search:**
![Screenshot of page after search](./assets/images/Screenshot2.png)

Once a button is selected, it will populate in the carousel! Bonus-feature: this website can also provide non-English songs and lyrics as well.

**Screenshot of page with video loaded:**
![Screenshot of page with video loaded](./assets/images/Screenshot3.png)

Note that not all songs are available through the YouTube API and can only be watched on their site.

**Screenshot of page with video unavailable:**
![Screenshot of page with video unavailable](./assets/images/Screenshot4.png)

Additionally, we have implemented a favorite buttons feature. When set to active, this will allow the song to be added to the user's "Favorites" page.

## APIs
The project uses the following APIs:
- Musixmatch API for song search and lyrics retrieval.
- YouTube API for embedding and playing music videos.

Make sure to obtain your API keys and configure them in the JavaScript code if you plan to deploy this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits
Members of Team Karaoke!
