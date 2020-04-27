const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('moviename');

let ticketPrice = parseInt(movieSelect.value);

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovie = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if (selectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) >= 0) {
        seat.classList.add('selected');
      }
    });
  }

  if (selectedMovie !== null) {
    movieSelect.selectedIndex = selectedMovie;
  }
  updateSelectedPrice();
}

populateUI();

function updateSelectedPrice() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;

  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

movieSelect.addEventListener('change', e => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedPrice();
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedPrice();
  }
});
