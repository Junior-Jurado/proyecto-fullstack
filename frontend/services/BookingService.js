class BookingService {

    constructor () {
        this.URI = "http://localhost:3000/api/bookings";
    }

    async createBooking(booking) {
        const res = await fetch(`${this.URI}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer: booking.customer,
                vehicle: booking.vehicle,
                start_date: booking.start_date,
                end_date: booking.end_date,
                pickup: booking.pickup,
                dropoff: booking.dropoff,
                description: booking.description
            })
        });

        const result = await res.json();
        return result; 
    }

    async getBookingsByUser(idUser) {
        const res = await fetch(`${this.URI}/user/${idUser}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await res.json();
        return result; 

    }

    async deleteBooking(idUser, idVehicle) {
        const res = await fetch(`${this.URI}/delete/user/${idUser}/vehicle/${idVehicle}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await res.json();
        return result; 
    }
}

export default BookingService;
