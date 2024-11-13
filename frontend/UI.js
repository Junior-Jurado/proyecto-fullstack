import CostumerService from "./services/CostumerService";
import VehicleService from "./services/VehicleService";
import AdministratorService from "./services/AdministratorService";

const costumerService = new CostumerService();
const vehicleService = new VehicleService();
const administratorService = new AdministratorService();

class UI {

    constructor() {
        this.vehicleService = vehicleService;
        this.costumerService = costumerService;
        this.administratorService = administratorService;
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

    // Metodo de login de admin
    async loginAdmin(email, password) {
        try {
            const result = await AdministratorService.loginAdmin(email, password);
            console.log(result);

            if (result.success) {
                localStorage.setItem('adminId', result.data.id);

                setTimeout(() => {
                    window.location.href = 'AdministradorScreen.html';
                }, 1000);
            } else {
                alert(result.message || 'Error al iniciar sesión (Administrador)');
            }
        } catch (error) {
            console.error('Error en el login (Administrator): ', error);
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
                    <div class="card" data-vehicle-id="${vehicle.vehicle_id}" style="cursor: pointer;">
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
                const vehicleId = card.getAttribute('data-vehicle-id') || 'sin-id';
                console.log("Vehículo ID desde la tarjeta:", vehicleId);
                this.selectVehicle(vehicleId);  
            });
        });
    }

    // Método para seleccionar un vehículo
    selectVehicle(vehicleId) {
        const userId = localStorage.getItem('userId'); // Obtener el ID del usuario desde localStorage
        console.log("ID del vehículo seleccionado:", vehicleId);
        console.log("ID del usuario:", userId);
    
        // Almacenar ambos IDs en localStorage
        localStorage.setItem('selectedVehicleId', vehicleId);
        localStorage.setItem('userId', userId);
    
        // Aquí necesitas obtener la información del vehículo con su ID, por ejemplo, haciendo una llamada a la API:
        this.vehicleService.getById(vehicleId)  // Asegúrate de tener este método en tu servicio
            .then(vehicleData => {
                // Almacenar la URL de la imagen en localStorage
                localStorage.setItem('vehicleImage', vehicleData.image);
    
                // Redirigir a la página CarInfo.html
                window.location.href = 'CarInfo.html';
            })
            .catch(error => {
                console.error("Error al obtener los detalles del vehículo:", error);
                alert("Hubo un error al cargar los detalles del vehículo.");
            });
    }
    

    makeBooking() {}
}

export default UI;
