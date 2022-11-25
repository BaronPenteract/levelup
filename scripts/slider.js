const reviewsElement = document.querySelector('.reviews');
const reviewsContainer = reviewsElement.querySelector('.reviews__container');
const nextBnt = reviewsElement.querySelector('.reviews__btn_type_next');
const prevBnt = reviewsElement.querySelector('.reviews__btn_type_prev');

let posX;
let posInit;
let posDelta = 0;
let posLeft = 0;


const getEvent = (e) =>  e.type.includes('touch') ? e.touches[0] : e;

function checkPosition() {
  let scroll = true;
  if (reviewsContainer.offsetLeft > 0) {
    reviewsContainer.style.left = 0;
    scroll = false;
  }

  if (reviewsContainer.offsetLeft + reviewsContainer.offsetWidth < reviewsElement.offsetWidth) {
    reviewsContainer.style.left = reviewsElement.offsetWidth - reviewsContainer.offsetWidth + 'px';
    scroll = false;
  }
  return scroll
}

function swipeStart(e) {
  let evt = getEvent(e);

  posInit = evt.clientX;

  posLeft = isFinite(posLeft) ? parseInt(reviewsContainer.style.left) : 0;

  reviewsContainer.addEventListener('touchmove', swipeAction);
  reviewsContainer.addEventListener('mousemove', swipeAction);

  reviewsContainer.addEventListener('touchend', swipeEnd);
  reviewsContainer.addEventListener('mouseup', swipeEnd);
}

function swipeAction(e) {
  let evt = getEvent(e);

  posX = evt.clientX;
  posDelta = posX - posInit;

  reviewsContainer.style.left = posDelta + posLeft + 'px';
}

function swipeEnd(e) {

  setTimeout(checkPosition, 100);

  reviewsContainer.removeEventListener('touchmove', swipeAction);
  reviewsContainer.removeEventListener('mousemove', swipeAction);

  reviewsContainer.removeEventListener('touchend', swipeEnd);
  reviewsContainer.removeEventListener('mouseup', swipeEnd);
}

reviewsContainer.addEventListener('touchstart', swipeStart);
reviewsContainer.addEventListener('mousedown', swipeStart);

nextBnt.addEventListener('click', function() {
  const delta = parseInt(reviewsContainer.style.left) || 0;
  reviewsContainer.style.left = delta + 320 +'px';
  setTimeout(checkPosition, 100);
})

prevBnt.addEventListener('click', function() {
  const delta = parseInt(reviewsContainer.style.left) || 0;
  reviewsContainer.style.left = delta - 320 +'px';
  setTimeout(checkPosition, 100);
})
