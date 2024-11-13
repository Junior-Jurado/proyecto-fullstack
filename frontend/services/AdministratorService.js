class AdministratorService{

    constructor(){
        this.URI = 'http://localhost:3000/api/administrator'
    }

    async loginAdmin(email, password){
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
}

module.exports = AdministratorService;