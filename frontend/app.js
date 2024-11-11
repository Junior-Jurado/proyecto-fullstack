require('./styles/app.css');
// require('./styles/homeScreen.css');
require('./styles/app.css');  // This requires the styles to be bundled or preprocessed


window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('login').addEventListener('click', login);
});

function login() {
    console.log("login function called");  // Verificar si la función se llama

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Password:', password);

    setTimeout(function() {
        window.location.href = 'HomeScreen.html';
    }, 15000); 
}



