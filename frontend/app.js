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

    // Recuperar el id del usuario desde localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
        console.log("Usuario logueado con ID:", userId);
    }
});

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    ui.login(email, password);  // Utiliza la instancia de UI para iniciar sesión
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
            localStorage.setItem('userId', result.data.id); // Guardamos el ID del usuario en el localStorage
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

async function reserveCar(carId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Debes iniciar sesión para hacer una reserva');
        return;
    }

    // Aquí puedes agregar el código para hacer la reserva de coche con el userId y carId
    console.log('Reservando el coche con ID:', carId, 'para el usuario con ID:', userId);
}

// Añadimos la función para manejar la selección del vehículo
function selectVehicle(vehicleId) {
    // Guarda el ID del vehículo en localStorage
    localStorage.setItem('vehicleId', vehicleId);

    // Redirige a la página carInfo.html
    window.location.href = 'carInfo.html';
}