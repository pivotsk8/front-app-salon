<script setup>
import { useUserStore } from '../../stores/user';

const user = useUserStore();
</script>


<template>
    <div>
        <p class="text-white text-lg mt-5">
            Acontiuación podrás administrar tus próximas citas
        </p>

        <p v-if="user.loading" class="text-white text-2xl text-center mt-5">
            Cargando...
        </p>

        <div v-else>
            <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">
                No tienes próximas citas
            </p>

        </div>
    </div>
</template>

