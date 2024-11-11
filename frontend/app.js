require('./styles/app.css');
// require('./styles/homeScreen.css');

import CostumerService from './services/CostumerService';

const costumerService = new CostumerService();


window.addEventListener('DOMContentLoaded', (event) => {
    const loginButton = document.getElementById('login');
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }
});

async function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const result = await costumerService.loginUser(email, password);
        console.log(result);

        if (result.success) {
            localStorage.setItem('userId', result.data.id);
            setTimeout(function() {
                window.location.href = 'HomeScreen.html'; 
            }, 1000);
        } else {
            alert(result.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        alert('Hubo un error al procesar tu solicitud');
    }
}


window.addEventListener('DOMContentLoaded', (event) => {
    const registerButton = document.getElementById('register-btn');
    if (registerButton) {
        registerButton.addEventListener('click', register);
    }
});

async function register() {
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var repeat_password = document.getElementById('repeat_password').value;

    console.log('Nombre:', first_name);
    console.log('Apellido:', last_name);
    console.log('Email:', email);
    console.log('Teléfono:', phone);
    console.log('Dirección:', address);
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);

    // Verificar si las contraseñas coinciden
    if (password !== repeat_password) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const result = await costumerService.registerUser({
            first_name,
            last_name,
            email,
            phone,
            address,
            username,
            password
        });

        console.log(result);

        // Si el registro es exitoso, redirigir a la página de login
        if (result.success) {
            setTimeout(function() {
                window.location.href = 'index.html';  // Cambié aquí la redirección a Login.html
            }, 1000);
        } else {
            alert(result.message || 'Error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        alert('Hubo un error al procesar tu solicitud');
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const userId = localStorage.getItem('userId');

    if (userId) {
        console.log('ID del usuario:', userId);
    } else {
        console.log('El usuario no está logueado');
        window.location.href = 'index.html';
    }
});
