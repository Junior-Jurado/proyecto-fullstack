class CostumerService {

    constructor() {
        this.URI = 'http://localhost:3000/api/customers';
    }
    async loginUser(email, password) {
        const res = await fetch(`${this.URI}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })  
        });
        const data = await res.json();
        console.log(data);
        return data;
    }

    async registerUser(costumer) {
        const res = await fetch(`${this.URI}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                first_name: costumer.first_name,
                last_name: costumer.last_name,
                email: costumer.email,
                phone: costumer.phone,
                address: costumer.address,
                username: costumer.username,
                password: costumer.password
            })
        });
    
        const data = await res.json();
        return data;
    }
}

module.exports = CostumerService;
