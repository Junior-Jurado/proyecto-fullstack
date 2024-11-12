import './styles/app.css';
import './styles/homeScreen.css';

import CostumerService from './services/CostumerService';
import UI from './UI';

const costumerService = new CostumerService();
const ui = new UI();

window.addEventListener('DOMContentLoaded', () => {
    // Cuando el DOM se haya cargado completamente, carga los vehículos automáticamente
    if (document.title === "Inicio - Alquiler de Vehículos") {
        ui.renderVehicles();  // Llama a la función renderVehicles desde la UI de forma automática
    }

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

    const ui = new UI();
    ui.login(email, password);
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
    console.log(userId);
});
