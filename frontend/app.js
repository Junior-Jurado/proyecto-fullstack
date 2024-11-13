import './styles/app.css';
import './styles/homeScreen.css';
import './styles/loginAdmin.css';

import CostumerService from './services/CostumerService';
import UI from './UI';

const costumerService = new CostumerService();
const ui = new UI();

window.addEventListener('DOMContentLoaded', () => {
    // Cuando el DOM se haya cargado completamente, carga los vehículos automáticamente
    if (document.title === "Inicio - Alquiler de Vehículos") {
        ui.renderVehicles();  // Llama a la función renderVehicles desde la UI de forma automática
        
        // Recuperar el id del usuario desde localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
            console.log("Usuario logueado con ID:", userId); // Imprime el ID del usuario en consola
        } else {
            console.log("No hay usuario logueado.");
        }
    }

    if (document.title === "Información del Vehículo") {
        // Agregar el evento al botón "Volver"
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.href = 'HomeScreen.html'; // Redirige al Home
            });
        }

        // Añadir evento al formulario de reserva para redirigir al Home al hacer la reserva
        const reservationForm = document.querySelector('form');
        reservationForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita el envío del formulario
            // Aquí agregar lógica para enviar la reserva, si es necesario
            window.location.href = 'HomeScreen.html'; // Redirige al Home tras hacer la reserva
        });
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

function isCarInfoPage() {
    return window.location.pathname.includes('CarInfo.html');
}


if (isCarInfoPage()) {
    window.onload = function () {
        // Obtener los IDs del vehículo y del usuario desde localStorage
        const selectedVehicleId = localStorage.getItem('selectedVehicleId');
        const userId = localStorage.getItem('userId');
        const vehicleImage = localStorage.getItem('vehicleImage');  // Obtener la URL de la imagen

        // Verificar si los valores están presentes en el localStorage
        if (selectedVehicleId && userId && vehicleImage) {
            console.log("ID del vehículo seleccionado en CarInfo.html:", selectedVehicleId);
            console.log("ID del usuario en CarInfo.html:", userId);

            // Aquí puedes realizar peticiones al backend para obtener más información sobre el vehículo
            fetchVehicleInfo(selectedVehicleId);
            fetchUserInfo(userId);

            // Mostrar la imagen del vehículo
            const vehicleImageElement = document.getElementById('vehicle-image');
            vehicleImageElement.src = vehicleImage;  // Asignar la URL de la imagen
        } else {
            console.log("No se encontraron los IDs o la imagen en localStorage.");
            alert("No se pudo cargar la información del vehículo o del usuario.");
        }
    };

    // Función para obtener información sobre el vehículo con el ID proporcionado
    function fetchVehicleInfo(vehicleId) {
        // Realiza una llamada fetch a tu API o fuente de datos para obtener los detalles del vehículo
        fetch(`https://miapi.com/vehicles/${vehicleId}`)
            .then(response => response.json())
            .then(vehicleData => {
                console.log("Datos del vehículo:", vehicleData);
                displayVehicleInfo(vehicleData);
            })
            .catch(error => {
                console.error("Error al obtener información del vehículo:", error);
            });
    }

    // Función para obtener información sobre el usuario con el ID proporcionado
    function fetchUserInfo(userId) {
        // Realiza una llamada fetch a tu API o fuente de datos para obtener los detalles del usuario
        fetch(`https://miapi.com/users/${userId}`)
            .then(response => response.json())
            .then(userData => {
                console.log("Datos del usuario:", userData);
                displayUserInfo(userData);
            })
            .catch(error => {
                console.error("Error al obtener información del usuario:", error);
            });
    }

    // Función para mostrar la información del vehículo en la página
    function displayVehicleInfo(vehicleData) {
        // Aquí puedes actualizar los elementos HTML para mostrar la información del vehículo
        const vehicleTitle = document.getElementById('vehicle-title');
        const vehicleDescription = document.getElementById('vehicle-description');

        vehicleTitle.textContent = `${vehicleData.brand} ${vehicleData.model}`;
        vehicleDescription.textContent = `Año: ${vehicleData.year} | Categoría: ${vehicleData.category}`;
    }

    // Función para mostrar la información del usuario en la página
    function displayUserInfo(userData) {
        // Aquí puedes actualizar los elementos HTML para mostrar la información del usuario
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <h2>Información del Usuario</h2>
            <p><strong>ID de Usuario:</strong> ${userData.id}</p>
            <p><strong>Nombre:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
        `;
    }
}

async function submitCarInfo() {
    // Extraemos los valores de los campos del formulario de información del vehículo
    const vehicleMake = document.getElementById('vehicleMake').value;
    const vehicleModel = document.getElementById('vehicleModel').value;
    const vehicleYear = document.getElementById('vehicleYear').value;
    const vehicleColor = document.getElementById('vehicleColor').value;
    const vehicleLicensePlate = document.getElementById('vehicleLicensePlate').value;
    const vehiclePrice = document.getElementById('vehiclePrice').value;
    
    // Validamos que todos los campos requeridos estén completos
    if (!vehicleMake || !vehicleModel || !vehicleYear || !vehicleColor || !vehicleLicensePlate || !vehiclePrice) {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Creamos un objeto con los datos del formulario
    const carInfo = {
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleColor,
        vehicleLicensePlate,
        vehiclePrice
    };

    try {
        // Llamamos al servicio que maneja la creación de la información del vehículo
        const result = await carService.submitCarInfo(carInfo);

        if (result.success) {
            alert('Vehículo registrado correctamente');
            setTimeout(() => {
                window.location.href = 'vehicleList.html'; // Redirigir a la lista de vehículos o donde se requiera
            }, 1000);
        } else {
            alert(result.message || 'Error al registrar el vehículo');
        }
    } catch (error) {
        console.error('Error en el registro del vehículo:', error);
        alert('Hubo un error al procesar tu solicitud');
    }
}