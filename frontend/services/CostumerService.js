class CostumerService {

    constructor() {
        this.URI = 'http://localhost:3000/api/customers';
    }

    async loginUser(email, password) {
        const res = await fetch(this.URI, {
            method: 'GET',
            body: {
                email: email,
                password: password
            }
        });
        const data = res.json();
        return data;
    }
}