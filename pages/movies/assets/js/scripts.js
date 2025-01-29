function openModal(movie) {
    document.getElementById('movie-name').textContent = movie;
    const seatsContainer = document.getElementById('seats-container');
    seatsContainer.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;
        seat.onclick = function () {
            if (!seat.classList.contains('selected') && document.querySelectorAll('.seat.selected').length < 10) {
                seat.classList.add('selected');
            } else {
                seat.classList.remove('selected');
            }
        };
        seatsContainer.appendChild(seat);
    }
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function reserveSeats() {
    if (document.querySelectorAll('.seat.selected').length > 0) {
        alert('Reservation successful!');
        closeModal();
    } else {
        alert('Please select at least one seat to reserve.');
    }
}