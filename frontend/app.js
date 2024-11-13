import './styles/app.css';
import './styles/homeScreen.css'
import './styles/AdministradorScreen.css'
import './styles/loginAdmin.css'

import CostumerService from './services/CostumerService';



const costumerService = new CostumerService();

window.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    const registerButton = document.getElementById('register-btn');

    if (loginButton) {
        loginButton.addEventListener('click', login);
    }

    if (registerButton) {
        registerButton.addEventListener('click', register);
    }
});

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const result = await costumerService.loginUser(email, password);
        console.log(result);

        if (result.success) {
            localStorage.setItem('userId', result.data.id);

            setTimeout(() => {
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

async function register() {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const repeat_password = document.getElementById('repeat_password').value;

    console.log('Nombre:', first_name);
    console.log('Apellido:', last_name);
    console.log('Email:', email);
    console.log('Teléfono:', phone);
    console.log('Dirección:', address);
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);

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

        if (result.success) {
            localStorage.setItem('userId', result.data.id);

            setTimeout(() => {
                window.location.href = 'index.html';
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
    console.log(userId)
});

