// loading page
const spinnerLoad = document.querySelector('.loading');
document.addEventListener("DOMContentLoaded", function() {
    spinnerLoad.style.display = 'none';
});

// slider
const headerSlider = {
    wrapper: document.querySelector('.header__slider'),
    btnPrev: document.querySelector('.slider_btn--prev'),
    btnNext: document.querySelector('.slider_btn--next'),
    length: document.querySelectorAll('.header__slider__item').length,
    currentItem: document.querySelector('.header__slider_nav__current--item'),
    currentTotal: document.querySelector('.header__slider_nav__current--total')
};

const siemaSlider = new Siema({
    selector: headerSlider.wrapper,
    onInit: initSlider,
    onChange: changeSlider,
});


function initSlider() {
    headerSlider.currentItem.innerHTML = `0${this.currentSlide + 1}`;
    headerSlider.currentTotal.innerHTML = `0${headerSlider.length}`;
}

function changeSlider() {    
    headerSlider.currentItem.innerHTML = `0${this.currentSlide + 1}`;
    moveSlide();
}

function moveSlide() {
    if (siemaSlider.currentSlide == 0) {
        headerSlider.btnNext.classList.remove('disabled')
        headerSlider.btnPrev.classList.add('disabled')
    } else if (siemaSlider.currentSlide == headerSlider.length - 1) {
        headerSlider.btnNext.classList.add('disabled')
        headerSlider.btnPrev.classList.remove('disabled')
    } else {
        headerSlider.btnNext.classList.remove('disabled')
        headerSlider.btnPrev.classList.remove('disabled')
    }
}

headerSlider.btnPrev.addEventListener('click', () => {
    siemaSlider.prev(1, moveSlide);
});

headerSlider.btnNext.addEventListener('click', () => {
    siemaSlider.next(1, moveSlide);    
});

// Sticky nav
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navMenu = document.querySelector('.nav__menu');

const observerCallback = (entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        nav.classList.remove('sticky');
        header.classList.remove('sticky_nav');
    } else {
        nav.classList.add('sticky');
        header.classList.add('sticky_nav');
        navMenu.classList.remove('visible');
    }
}
const headerObserver = new IntersectionObserver(observerCallback, {
    root: null,
    threshold: 0,
    rootMargin: '-133px',
});

headerObserver.observe(header);

// Apperance section
const allSection = document.querySelectorAll('section');

const apperanceSection = (entries) => {
    const entry = entries[0];
    entry.isIntersecting && entry.target.classList.remove('section--hidden');
}
const allSectionObserver = new IntersectionObserver(apperanceSection, {
    root: null,
    threshold: 0.2
})
allSection.forEach((section) => {
    allSectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Burger menu
const burgerBtn = document.querySelector('.nav__menu_btn');

burgerBtn.addEventListener('click', () => {
    document.querySelector('.nav__menu').classList.toggle('visible');
});
