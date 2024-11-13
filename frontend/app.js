import './styles/app.css';
import './styles/homeScreen.css';

import CostumerService from './services/CostumerService';
import BookingService from './services/BookingService';
import VehicleService from './services/VehicleService';

import UI from './UI';

const costumerService = new CostumerService();
const bookingsService = new BookingService();
const vehiclesService = new VehicleService();

const ui = new UI();

window.addEventListener('DOMContentLoaded', () => {

    if (document.title === "Reservas Usuario") {
        const userId = localStorage.getItem('userId');
    
        if (userId) {
            console.log("ID del usuario logueado en ReservasCustomer:", userId)
            loadUserBookings(userId);
        } else {
            mostrarSinReservas();
        }
    
        // Redirigir a HomeScreen si el usuario no tiene reservas
        document.getElementById('home-button').addEventListener('click', () => {
            window.location.href = 'HomeScreen.html';
        });
    }

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
        // Añadir evento al formulario de reserva para redirigir al Home al hacer la reserva
        const reservationForm = document.querySelector('form');
        reservationForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío del formulario

            const startDateElem = document.getElementById('startDate');
            const endDateElem = document.getElementById('endDate');
            const pickupLocationElem = document.getElementById('pickupLocation'); // Cambiado a pickupLocation
            const dropoffLocationElem = document.getElementById('dropoffLocation'); // Cambiado a dropoffLocation
            const additionalInfoElem = document.getElementById('additionalInfo');

            if (startDateElem && endDateElem && pickupLocationElem && dropoffLocationElem && additionalInfoElem) {
                const startDate = startDateElem.value;
                const endDate = endDateElem.value;
                const pickupLocation = pickupLocationElem.value; // Cambiado a pickupLocation
                const dropoffLocation = dropoffLocationElem.value; // Cambiado a dropoffLocation
                const additionalInfo = additionalInfoElem.value;
                
                // Obtener el ID del vehículo y del usuario desde localStorage
                const vehicleId = localStorage.getItem('selectedVehicleId');
                const userId = localStorage.getItem('userId');

                if (!startDate || !endDate || !pickupLocation || !dropoffLocation || !additionalInfo) {
                    alert("Por favor, complete todos los campos del formulario.");
                    return;
                }

                if (!vehicleId || !userId) {
                    alert("No se encontró el ID del vehículo o del usuario.");
                    return;
                }

                const today = new Date().setHours(0, 0, 0, 0); // Establece la hora a 00:00:00 para comparar solo la fecha
                if (new Date(startDate) < today) {
                    alert("La fecha de inicio debe ser igual o posterior a la fecha actual.");
                    return;
                }

                // Validación: La fecha de endDate debe ser mayor que la fecha de startDate
                if (new Date(endDate) <= new Date(startDate)) {
                    alert("La fecha de finalización debe ser posterior a la fecha de inicio.");
                    return;
                }

                // Crear la reserva
                const booking = {
                    customer: userId,
                    vehicle: vehicleId,
                    start_date: startDate,
                    end_date: endDate,
                    pickup: pickupLocation, 
                    dropoff: dropoffLocation, 
                    description: additionalInfo
                };

                try {
                    const result = await bookingsService.createBooking(booking);
                    const state = await vehiclesService.changeUnavailable(booking.vehicle);
                    console.log(state);
                    if (result.success) {
                        alert('Reserva creada correctamente');
                        window.location.href = 'HomeScreen.html'; // Redirige al Home tras crear la reserva
                    } else {
                        alert('Error al crear la reserva');
                    }
                } catch (error) {
                    console.error('Error al crear la reserva:', error);
                    alert('Hubo un error al procesar tu reserva');
                }
            } else {
                console.error("Uno o más elementos del formulario no están presentes.");
            }
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

            // Mostrar la imagen del vehículo
            const vehicleImageElement = document.getElementById('vehicle-image');
            vehicleImageElement.src = vehicleImage;  // Asignar la URL de la imagen
        } else {
            console.log("No se encontraron los IDs o la imagen en localStorage.");
            alert("No se pudo cargar la información del vehículo o del usuario.");
        }
    };

    function displayVehicleInfo(vehicleData) {
        const vehicleTitle = document.getElementById('vehicle-title');
        const vehicleDescription = document.getElementById('vehicle-description');

        vehicleTitle.textContent = `${vehicleData.brand} ${vehicleData.model}`;
        vehicleDescription.textContent = `Año: ${vehicleData.year} | Categoría: ${vehicleData.category}`;
    }

    function displayUserInfo(userData) {
        const userInfoDiv = document.getElementById('user-info');
        userInfoDiv.innerHTML = `
            <h2>Información del Usuario</h2>
            <p><strong>ID de Usuario:</strong> ${userData.id}</p>
            <p><strong>Nombre:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
        `;
    }
}

function mostrarSinReservas() {
    const bookingList = document.getElementById('booking-list');
    const noBookings = document.getElementById('no-bookings');

    if (bookingList) bookingList.style.display = 'none';
    if (noBookings) noBookings.style.display = 'block';
}

async function loadUserBookings(idUser) {
    const response = await bookingsService.getBookingsByUser(idUser);
    const bookingsContainer = document.getElementById('bookings-container');
    bookingsContainer.innerHTML = '';

    if (!response.success) {
        bookingsContainer.innerHTML = '<p>No tienes reservas hasta ahora.</p>';
        return;
    }

    const bookings = response.data;

    if (bookings.length === 0) {
        bookingsContainer.innerHTML = '<p>No tienes reservas en este momento.</p>';
        return;
    }

    for (const booking of bookings) {
        const vehicleData = await vehiclesService.getById(booking.vehicle_id);

        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        const daysRented = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));

        const bookingCard = document.createElement('div');
        bookingCard.classList.add('col-md-6');
        bookingCard.innerHTML = `
            <div class="card card-custom shadow-sm">
                <div class="row no-gutters">
                    <div class="col-md-5">
                        <img src="${vehicleData.image || 'https://via.placeholder.com/200'}" 
                             class="img-fluid rounded-start vehicle-image" alt="Imagen del ${vehicleData.brand} ${vehicleData.model}">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">${vehicleData.brand} ${vehicleData.model}</h5>
                            <p class="card-text">Precio por día: <strong>$${vehicleData.daily_price}</strong></p>
                            <p class="card-text">Días alquilados: <strong>${daysRented}</strong></p>
                            <p class="card-text">Total: <strong>$${(daysRented * parseFloat(vehicleData.daily_price)).toFixed(2)}</strong></p>
                            <button class="btn action-btn ${booking.state === 'Finalizado' ? 'rate-btn' : 'cancel-btn'} btn-block mt-3">
                                ${booking.state === 'Finalizado' ? 'Calificar Servicio' : 'Cancelar Reserva'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const actionBtn = bookingCard.querySelector('.action-btn');

        if (actionBtn) {
            if (booking.state === 'Finalizado') {
                actionBtn.addEventListener('click', () => {
                    window.location.href = `calificarServicio.html`;
                });
            } else {
                actionBtn.addEventListener('click', async () => {
                    try {
                        await bookingsService.deleteBooking(idUser, booking.vehicle_id);
                        await vehiclesService.changeAvailable(booking.vehicle_id);

                        window.location.reload();
                    } catch (error) {
                        console.error('Error al cancelar la reserva o actualizar el estado del vehículo:', error);
                    }
                });
            }
        }

        bookingsContainer.appendChild(bookingCard);
    }
}
