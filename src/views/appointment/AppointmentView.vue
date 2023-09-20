<script setup>
import SelectedService from '../../components/SelectedService.vue';
import { useAppointmentStore } from '../../stores/appointments';

const appointments = useAppointmentStore()
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white mt-10">Detalles Cita y Resumen</h2>
    <p class="text-white text-lg mt-5">A continuaciíon verifica la informacion y confirma tu cita</p>
    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
    <div class="grip gap-5">
        <SelectedService 
        v-for="service in appointments.services"
        :key="service._id"
        :service="service"
        />
    </div>
</template>

