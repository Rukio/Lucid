var features = document.querySelector('.sec2');
var about = document.querySelector('.sec3');
var testimonals = document.querySelector('.sec4');
var pricing = document.querySelector('.sec7');
var contact = document.querySelector('.sec8');

function nav(y) {

    if (y == 2) {
        window.scrollTo(0, features.getBoundingClientRect().top);
    } else

    if (y == 3) {
        window.scrollTo(0, about.getBoundingClientRect().top);
    }

    if (y == 4) {
        window.scrollTo(0, testimonals.getBoundingClientRect().top);
    }

    if (y == 5) {
        window.scrollTo(0, pricing.getBoundingClientRect().top - 20);
    }

    if (y == 6) {
        window.scrollTo(0, contact.getBoundingClientRect().top);
    }
}