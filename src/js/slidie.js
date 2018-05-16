var d = document;

var carousel = d.querySelector('.carousel');
var btnPrev = d.querySelector('.button-previous');
var btnNext = d.querySelector('.button-next');
var sliderItem = d.querySelectorAll('.slider-item');
var sliderButton = d.querySelectorAll('.slider-button');
var btnContainer = d.querySelector('.slider-buttons');
var slider = d.querySelector('.slider');
var media = window.matchMedia('(max-width: 640px)');
var media_1200 = window.matchMedia('(min-width: 1200px)');
var sliderWidth = document.documentElement.clientWidth;
var autoScrollTime = 8000;
var left = 0;
var sliderItemNum = sliderItem.length;
var tick = 1;

// mediaCheck();

if (d.contains(btnNext)) {
    btnNext.onclick = nextSlider;
}
if (d.contains(btnPrev)) {
    btnPrev.onclick = prevSlider;
}
if(d.contains(btnContainer)) {
    sliderButton[0].classList.add('is-active');
}

var interval = setInterval(function sliding() {
    sliderRight();
}, autoScrollTime);

function slide(n) {
    left = (0 - (n * sliderWidth)) + sliderWidth
    tick = n;
    carousel.style.left = left + 'px';
    if(d.contains(btnContainer)) {
        for (i = 0; i < sliderButton.length; i++) {
            sliderButton[i].classList.remove('is-active');
        }
        sliderButton[n - 1].classList.add('is-active');
        clearInterval(interval);
    }
    
}

function nextSlider() {
    clearInterval(interval);
    sliderRight();
}

function prevSlider() {
    clearInterval(interval);
    sliderLeft();
}

function sliderRight() {
    if (tick < sliderItemNum) {
        tick++;
        left = left - sliderWidth; // 51.2%
        carousel.style.left = left + 'px';
    } else {
        tick = 1;
        left = 0;
        carousel.style.left = left + '%';
    }
    if(d.contains(btnContainer)) {
        for (i = 0; i < sliderButton.length; i++) {
            sliderButton[i].classList.remove('is-active');
        }
        sliderButton[tick - 1].classList.add('is-active');
    }
}

function sliderLeft() {
    if (tick > 1) {
        tick--;
        left = left + sliderWidth;
        carousel.style.left = left +'px';
    } else {
        tick = sliderItemNum;
        left = 0 - ((sliderWidth * sliderItemNum) - sliderWidth);
        carousel.style.left = left + 'px';
    }
    if(d.contains(btnContainer)) {
        for (i = 0; i < sliderButton.length; i++) {
            sliderButton[i].classList.remove('is-active');
        }
        sliderButton[tick - 1].classList.add('is-active');
    }
}

media.addListener(mediaCheck());
function mediaCheck() {
    if (media.matches) {
        sliderWidth = d.documentElement.clientWidth;
        slider.style.width = sliderWidth + 'px';

        for (i = 0; i < sliderItem.length; i++) {
            sliderItem[i].style.width = sliderWidth + 'px';
        }
    } else
    if (media_1200.matches) {
        sliderWidth = 600;
        slider.style.width = sliderWidth * 2 + 'px';

        for (i = 0; i < sliderItem.length; i++) {
                sliderItem[i].style.width = sliderWidth + 'px';
            }
    } else {
        sliderWidth = d.documentElement.clientWidth / 2;
        slider.style.width = sliderWidth * 2 + 'px';

        for (i = 0; i < sliderItem.length; i++) {
            sliderItem[i].style.width = sliderWidth + 'px';
        }
        
    }
}
