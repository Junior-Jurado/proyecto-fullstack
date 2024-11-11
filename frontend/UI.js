import CostumerService from "./services/CostumerService";
import VehicleService from "./services/VehicleService";

const costumerService = new CostumerService();
const vehicleService = new VehicleServiceService();
 

class UI {

    async login(email, password) {
        

        try {
            const result = await vehicleService.login(email, password);
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

    renderVehicles() {}

    makeBooking() {}

}

export default UI;