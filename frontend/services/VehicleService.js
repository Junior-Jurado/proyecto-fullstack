class VehicleService {
    constructor() {
        this.URI = 'http://localhost:3000/api/vehicles';
    }

    async getAvailables() {
        const res = await fetch(`${this.URI}/getAvailable`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data;
    }
    
    async getById(id) {
        const res = await fetch(`${this.URI}/getById/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data;
    }

    async changeUnavailable(id) {
        const res = await fetch(`${this.URI}/changeUnavailable/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data;
    }

    async changeAvailable(id) {
        const res = await fetch(`${this.URI}/changeAvailable/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data;
    }
}

export default VehicleService;
