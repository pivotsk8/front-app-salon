import { ref, computed, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import AppointmentAPI from '../api/AppointmentAPI'
import { convertToISO } from '../helpers/date'

export const useAppointmentStore = defineStore('appointments', () => {
    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')

    const toast = inject('toast')
    const router = useRouter()

    onMounted(() => {
        const startHour = 9
        const endHour = 19

        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    const onServiceSelected = service => {
        services.value.some(selectedService => selectedService._id === service._id)
            ? services.value = services.value.filter(selectedService => selectedService._id !== service._id)
            : (
                services.value.length === 2
                    ? alert('Máximo 2 servicos por cita')
                    : services.value.push(service)
            )
    }

    const createdAppointment = async () => {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        try {
            const { data } = await AppointmentAPI.create(appointment)
            toast.open({
                message: data.msg,
                type: 'success'
            })
            clearAppointmentData()
            router.push({ name: 'my-appointment' })
        } catch (error) {
            console.log(error)
        }
    }

    const clearAppointmentData = () => {
        services.value = []
        date.value = ''
        time.value = ''
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id)
    })

    const noServicesSelected = computed(() => services.value.length === 0
    )

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    })

    return {
        onServiceSelected,
        createdAppointment,
        isServiceSelected,
        services,
        date,
        hours,
        time,
        totalAmount,
        isValidReservation,
        noServicesSelected
    }

})