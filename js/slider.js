let slider = document.querySelector('#slider');

// Navigation
let left = document.querySelector('.left');
let right = document.querySelector('.right');
let startContactSlider;
let endContactSlider;

// Geting size
let imgItem = document.querySelectorAll('.slider-block');
let first = document.querySelector('.first');
let sliderImages = document.querySelector('.slider-images');

// Seting size
let sliderSize = first.clientWidth;
let imgSize = imgItem[0].clientWidth;
let sum = 0;
let createNextSlider = (sliderSize * 2) - imgSize;

// Allow automaticly
let automaticly = true;

sliderImages.style.transform = 'translateX(-' + sliderSize + 'px)';

function isAllowAvtomaticly() {
  slider.onmouseover = function () {
    automaticly = false;
  };

  slider.onmouseout = function () {
    automaticly = true;
  };
};

setInterval(function() {
  isAllowAvtomaticly();
  if (automaticly) {
    toRight();
  };
}, 2500);


// Mobile switch slider
slider.addEventListener('touchstart', function(event) {
  startContactSlider = event.targetTouches[0].pageX;
})

slider.addEventListener('touchmove', function(event) {
  endContactSlider = event.targetTouches[0].pageX;
});

slider.addEventListener('touchstart', function() {
  automaticly = false;
  setTimeout(() => automaticly = true, 1500)

  setTimeout(function() {
    if (startContactSlider > (endContactSlider + 250)) {
      toRight();
    };

    if (startContactSlider < (endContactSlider + 250)) {
      toLeft();
    };

    startContactSlider = undefined;
    endContactSlider = undefined;
  }, 300)
})

// Control button
right.addEventListener('click', toRight);
left.addEventListener('click', toLeft);

function toRight() {
  sum = sum + imgSize;
  move();
};

function toLeft() {
  sum = sum - imgSize;
  move();
};

function move() {
  sliderImages.style.transition = '.2s';
  sliderImages.style.transform = 'translateX(-' + (sliderSize + sum) + 'px)';

  if (sliderSize + sum <= imgSize || sliderSize + sum >= createNextSlider) {
    createNewSlide();
  };
};

function createNewSlide() {
  setTimeout(function() {
    sum = 0;
    sliderImages.style.transition = '0s';
    sliderImages.style.transform = 'translateX(-' + (sliderSize) + 'px)';
  }, 200);
};