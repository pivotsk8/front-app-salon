import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppointmentStore = defineStore('appointments', () => {

    const services = ref([])

    const onServiceSelected = service => {
        services.value.some(selectedService => selectedService._id === service._id)
            ? services.value = services.value.filter(selectedService => selectedService._id !== service._id)
            : (
                services.value.length === 2
                    ? alert('Máximo 2 servicos por cita')
                    : services.value.push(service)
            )
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => services.value.length === 0
    )
    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    return {
        onServiceSelected,
        isServiceSelected,
        services,
        totalAmount,
        noServicesSelected
    }

})