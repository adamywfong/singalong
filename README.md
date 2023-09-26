# Singalong
Singalong - Best Karaoke Page Ever!
![singalong screenshot](image.png)

Singalong is a interactive karaoke website that allows users to enjoy karaoke-style music and lyrics. Users can search for their favorite songs, view lyrics, and sing along to their chosen tracks. The project incorporates a colorful design and an image carousel to enhance the user experience which utilizes MusixMatch API and YouTube API to populate user requested video of song and lyrics to sing along to. Users can also favorite their favorite songs and view them in the favorites tab.

Link to site: [https://adamywfong.github.io/singalong/](https://adamywfong.github.io/singalong/)

Table of Contents
Features
Getting Started
Usage
APIs
License
Features
Search for songs and view their lyrics.
Enjoy a visually appealing design with unicorn-themed colors.
Sing along to music while viewing lyrics.
Navigate through images with an interactive image carousel.
Automatic slideshow feature in the image carousel.


## Installation

This webpage will be loaded, but Node.js might be required if user does not have it installed already to initialize bulma plugin.


## Usage
This is the webpage displayed at full screen, a blank landing page that can be populated through the search bar in the upper right corner.
The Favorites page will display a list of the user's favorite songs!
Open the project in a web browser.
Use the search bar to look for your favorite songs.
Click on a search result to view the song's lyrics and start singing along.
Enjoy the visually appealing design and the interactive image carousel.  

![Screenshot of page on load](./assets/images/Screenshot1.png)

If we input a search term, results will populate on the page in the form of buttons which can be selected.

![Screenshot of page after search](./assets/images/Screenshot2.png)

Once a button is selected, it will populate in the carousel! Bonus-feature: this website can also provide non-english song and lyrics as well.
    
![Screenshot of page with video loaded](./assets/images/Screenshot3.png)

However,not all songs are available through YouTube API and can only be watched on their site. 

![Screenshot of page with video unavailable](./assets/images/Screenshot4.png)

Additionally, we have implemented a favorite buttons feature. When set to active, this will allow the song to be added to the user's "Favorites" page. 


## APIs

The project uses the following APIs:

Musixmatch API for song search and lyrics retrieval.
YouTube API for embedding and playing music videos.
Make sure to obtain your API keys and configure them in the JavaScript code if you plan to deploy this project.


License
This project is licensed under the MIT License - see the LICENSE file for details.



## License

[MIT](https://choosealicense.com/licenses/mit/)

## Credit
Members of Team Karaoke!
