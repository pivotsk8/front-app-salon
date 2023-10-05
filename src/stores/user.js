import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '../api/AuthApi'
import AppointmentApi from '../api/AppointmentAPI'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})
    const userAppointments = ref([])

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
            await getUserAppointments()
        } catch (error) {
            console.log(error)
        }
    })

    async function getUserAppointments() {
        const { data } = await AppointmentApi.getUserAppointments(user.value._id)
        userAppointments.value = data
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : '')

    function logout() {
        localStorage.removeItem("AUTH_TOKEN")
        user.value = {}
        router.push({ name: 'login' })
    }

    const noAppointments = computed(() => userAppointments.value.length === 0)

    return {
        user,
        getUserName,
        logout,
        userAppointments,
        noAppointments
    }
})