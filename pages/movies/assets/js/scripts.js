// Open the movie reservation modal
function openModal(movie) {
    document.getElementById('movie-name').textContent = movie;
    const seatsContainer = document.getElementById('seats-container');
    seatsContainer.innerHTML = '';

    let reservedSeats = getReservedSeats(movie);
    let availableSeats = 10 - reservedSeats.length;

    document.getElementById('available-count').textContent = availableSeats; // Update available seats display

    // Create seats dynamically
    for (let i = 1; i <= 10; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;

        if (reservedSeats.includes(i.toString())) {
            seat.classList.add('reserved'); // Reserved seats turn red
        } else {
            seat.onclick = function () {
                if (!seat.classList.contains('selected') && document.querySelectorAll('.seat.selected').length < availableSeats) {
                    seat.classList.add('selected');
                } else {
                    seat.classList.remove('selected');
                }
            };
        }

        seatsContainer.appendChild(seat);
    }

    document.getElementById('modal').style.display = 'flex';
}

// Close the modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Reserve selected seats
function reserveSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const movieName = document.getElementById('movie-name').textContent;

    if (selectedSeats.length > 0) {
        alert(`You have reserved ${selectedSeats.length} seat(s). Please proceed to payment.`);

        // Prompt for payment method
        const paymentType = prompt("Enter your payment method (e.g., Credit Card, PayPal, Cash):");
        if (!paymentType) {
            alert("Payment method is required to complete the reservation.");
            return;
        }

        // Calculate total amount
        const ticketPrice = 10; // Example price per seat
        const totalAmount = selectedSeats.length * ticketPrice;
        const paymentAmount = prompt(`Your total is $${totalAmount}. Enter the amount to pay:`);

        if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) < totalAmount) {
            alert("Invalid payment amount. Reservation not completed.");
            return;
        }

        // Mark seats as reserved and save to local storage
        selectedSeats.forEach(seat => {
            seat.classList.add('reserved');
            seat.classList.remove('selected');
            saveReservation(movieName, seat.textContent);
        });

        // Confirm payment
        alert(`Payment successful! You paid $${paymentAmount} using ${paymentType}. Enjoy your movie.`);

        // Refresh modal to update seat availability
        openModal(movieName);
    } else {
        alert('Please select at least one seat to reserve.');
    }
}

// Save reservation to local storage
function saveReservation(movie, seatNumber) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || {};
    
    if (!reservations[movie]) {
        reservations[movie] = [];
    }

    if (!reservations[movie].includes(seatNumber)) {
        reservations[movie].push(seatNumber);
    }

    localStorage.setItem('reservations', JSON.stringify(reservations));
}

// Get reserved seats from local storage
function getReservedSeats(movie) {
    let reservations = JSON.parse(localStorage.getItem('reservations')) || {};
    return reservations[movie] || [];
}
