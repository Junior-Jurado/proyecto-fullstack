class RatingService {

    constructor () {
        this.URI = "http://localhost:3000/api/ratings";
    }

    async createRating(rating) {
        const res = await fetch(`${this.URI}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                booking_id: rating.booking,
                score: rating.score,
                comment: rating.comment,
                sent_date: rating.sent_date
            })
        });

        const result = await res.json();
        return result; 
    }

    async getAll() {
        const res = await fetch(`${this.URI}/getAll`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await res.json();
        return result; 
    }
}