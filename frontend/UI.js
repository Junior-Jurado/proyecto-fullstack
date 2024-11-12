import CostumerService from "./services/CostumerService";
import VehicleService from "./services/VehicleService";

const costumerService = new CostumerService();
const vehicleService = new VehicleService();  // corrected line

class UI {

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

    async renderVehicles() {
        const vehicles = await vehicleService.getAvailables();
        const vehiclesContainer = document.getElementById("vehiculos-container");

        vehiclesContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos vehículos

        vehicles.forEach(vehicle => {
            const vehicleCard = `
                <div class="col-md-4">
                    <div class="card">
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
    }

    makeBooking() {}
}

export default UI;
