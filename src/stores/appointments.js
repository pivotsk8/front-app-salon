import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import AppointmentAPI from '../api/AppointmentAPI'
import { convertToISO, convertToDDMMYYYY } from '../helpers/date'
import { useUserStore } from '../stores/user'

export const useAppointmentStore = defineStore('appointments', () => {

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const appointmentsByDate = ref([])

    const toast = inject('toast')
    const router = useRouter([])
    const user = useUserStore()

    onMounted(() => {
        const startHour = 9
        const endHour = 19

        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = ''
        if (date.value === '') return

        //Obtener las citas
        const { data } = await AppointmentAPI.getByDate(date.value)


        if (appointmentId.value) {
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
            time.value = data.filter(appointment => appointment._id === appointmentId.value)[0].time
        } else {
            appointmentsByDate.value = data
        }

    })

    const setSelectedAppointment = appointment => {
        services.value = appointment.services
        date.value = convertToDDMMYYYY(appointment.date)
        time.value = appointment.time
        appointmentId.value = appointment._id
    }

    const onServiceSelected = service => {
        services.value.some(selectedService => selectedService._id === service._id)
            ? services.value = services.value.filter(selectedService => selectedService._id !== service._id)
            : (
                services.value.length === 2
                    ? alert('Máximo 2 servicos por cita')
                    : services.value.push(service)
            )
    }

    const saveAppointment = async () => {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        if (appointmentId.value) {
            try {
                const { data } = await AppointmentAPI.update(appointmentId.value, appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

            } catch (error) {
                console.log(error)
            }
        }

        if (!appointmentId.value) {
            try {
                const { data } = await AppointmentAPI.create(appointment)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })
            } catch (error) {
                console.log(error)
            }
        }
        clearAppointmentData()
        user.getUserAppointments()
        router.push({ name: 'my-appointment' })
    }

    const clearAppointmentData = () => {
        appointmentId.value = ''
        services.value = []
        date.value = ''
        time.value = ''
    }

    const cancelAppointment = async (id) => {
        if (confirm('¿Deseas cancelar esta cita?'))
            try {
                const { data } = await AppointmentAPI.delete(id)
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

                user.userAppointments = user.userAppointments.filter(appointment => appointment._id !== id)
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                })
            }
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

    const isDateSelected = computed(() => {
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour)
        }
    })

    return {
        setSelectedAppointment,
        onServiceSelected,
        saveAppointment,
        clearAppointmentData,
        cancelAppointment,
        isServiceSelected,
        services,
        date,
        hours,
        time,
        totalAmount,
        isValidReservation,
        noServicesSelected,
        isDateSelected,
        disableTime
    }

})