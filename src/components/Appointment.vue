<script setup>
import { displayDate } from '../helpers/date'
import { formatCurrency } from '../helpers'
defineProps({
    appointment: {
        type: Object,
    }
})
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">
            Fechas: <span class="font-ligth">{{ displayDate(appointment.date) }}</span>
            Hora: <span class="font-ligth">{{ appointment.time }} Horas</span>
        </p>

        <p class="text-lg font-black">Servicios Solicitados en la cita</p>
        <div v-for=" service in appointment.services" :key="service._id">
            <p>{{ service.name }}</p>
            <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>

        <p class="text-2xl font-black text-right">
            Total a pagar: <span class="text-blue-600">{{ formatCurrency(appointment.totalAmount) }}</span>
        </p>

        <div class="flex gap-2 items-center">
            <button class="bg-slate-600 text-white p-3 text-sm rounded-lg uppercase font-black flex-1 md:flex-none">
                Editar Cita
            </button>

            <button class="bg-red-600 text-white p-3 text-sm rounded-lg uppercase font-black flex-1 md:flex-none">
                Cancelar Cita
            </button>
        </div>
    </div>
</template>

