var maxIndex = 2;
var currentIndex = 0;

var nextButton = $('.slider-navigation-next');
var prevButton = $('.slider-navigation-previous');

nextButton.click(() =>  {
    var oldSlide = $('[data-slider-index="' + currentIndex + '"]');
    currentIndex += 1;  
	if (currentIndex> maxIndex){
		currentIndex = 0;
	};
    var newSlide = $('[data-slider-index="' + currentIndex + '"]');
	oldSlide.css("display", oldSlide.css("display") == 'block' ? 'none' : 'block');
	newSlide.css("display", newSlide.css("display") === 'none' ? 'block' : 'none');

});

prevButton.click(() => {
    var oldSlide = $('[data-slider-index="' + currentIndex + '"]');
    currentIndex -= 1;
    if (currentIndex < 0){
		currentIndex = maxIndex;
	};
	var newSlide = $('[data-slider-index="' + currentIndex + '"]');

	oldSlide.css("display", oldSlide.css("display") == 'block' ? 'none' : 'block');
	newSlide.css("display", newSlide.css("display") === 'none' ? 'block' : 'none');
});


function intialize() {
	for (var i = 0; i<=maxIndex; i++){
		var slide = $('[data-slider-index="' + i + '"]');
		if (i ==currentIndex) {
			slide.css("display", "block");
		} else {
			slide.css("display", "none");
		}
	}
}

intialize();