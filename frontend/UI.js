import CostumerService from "./services/CostumerService";
import VehicleService from "./services/VehicleService";

const costumerService = new CostumerService();
const vehicleService = new VehicleService();

class UI {

    constructor() {
        this.vehicleService = vehicleService;
        this.costumerService = costumerService;
    }

    // Método de login
    async login(email, password) {
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

    // Método para cargar los vehículos
    async renderVehicles() {
        const vehicles = await vehicleService.getAvailables();
        const vehiclesContainer = document.getElementById("vehiculos-container");
    
        vehiclesContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos vehículos
    
        vehicles.forEach(vehicle => {
            const vehicleCard = `
                <div class="col-md-4">
                    <div class="card" data-vehicle-id="${vehicle.id}" style="cursor: pointer;">
                        <img src="${vehicle.image}" class="card-img-top" alt="${vehicle.model}">
                        <div class="card-body">
                            <h5 class="card-title">${vehicle.brand} ${vehicle.model}</h5>
                            <p class="card-text">Año: ${vehicle.year}</p>
                            <p class="card-text">Categoría: ${vehicle.category}</p>
                            <p class="card-text">Precio Diario: $${vehicle.daily_price}</p>
                        </div>
                    </div>
                </div>
            `;
            vehiclesContainer.innerHTML += vehicleCard;  // Agregar la tarjeta del vehículo al contenedor
        });
    
        // Añadir el evento de clic a cada tarjeta
        const vehicleCards = document.querySelectorAll('.card');
        vehicleCards.forEach(card => {
            card.addEventListener('click', () => {
                const vehicleId = card.getAttribute('data-vehicle-id');
                this.selectVehicle(vehicleId);  // Llamamos a selectVehicle dentro de la clase UI
            });
        });
    }

    // Método para manejar la selección del vehículo
    async selectVehicle(vehicleId) {
        // Guarda el ID del vehículo en localStorage
        await localStorage.setItem('vehicleId', vehicleId);
    
        // Redirige a la página de información del vehículo
        window.location.href = 'CarInfo.html';
    }

    // Método para cargar la información del vehículo en la página CarInfo.html
    async loadVehicleInfo() {
        const vehicleId = localStorage.getItem('vehicleId');
        console.log('vehicleId:', vehicleId);

        if (!vehicleId) {
            alert("No se ha seleccionado ningún vehículo");
            return;
        }

        try {
            const vehicle = await vehicleService.getById(vehicleId);
            console.log('vehicle:', vehicle);

            const vehicleImage = document.getElementById('vehicle-image');
            vehicleImage.src = vehicle.image || 'ruta/a/imagen-por-defecto.jpg';

            document.getElementById('vehicle-title').textContent = `${vehicle.brand} ${vehicle.model}`;
            document.getElementById('vehicle-description').textContent = `${vehicle.description} - Año: ${vehicle.year} - Categoría: ${vehicle.category} - Precio Diario: $${vehicle.daily_price}`;
        } catch (error) {
            console.error("Error al cargar la información del vehículo:", error);
            alert("Error al cargar la información del vehículo");
        }
    }

    // Método para manejar la inicialización en CarInfo.html
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadVehicleInfo();  // Cargar la información del vehículo
        });
    }

    makeBooking() {}
}

export default UI;
