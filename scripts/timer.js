const timerEl = document.querySelector('.order__timer');


let n = 30;

timerEl.textContent = n + ' мин.';


const interval = setInterval(function() {
    timerEl.textContent = n + ' мин.';
    n--;

    if( n < 0 ) {
      clearInterval(interval)
    }
}, 60000)
