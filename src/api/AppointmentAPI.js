import api from '../lib/axios.js'

export default {
    create(data) {
        return api.post('/appointments', data)

    },

    getByDate(date) {
        return api.get(`/appointments?date=${date}`)
    }
}