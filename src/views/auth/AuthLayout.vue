<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

const autRoutes = [
    { name: 'register', text: 'Crear una cuenta' },
    { name: 'login', text: 'Iniciar Sessión' },
    { name: 'forgot-password', text: 'Olvide mi Pasword' }
]
</script>

<template>
    <div>
        <div class="mx-auto lg:w-3/5 mt-20">
            <RouterView />

            <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
                <RouterLink v-for="authRoute in autRoutes" class="uppercase font-bold text-white"
                    :to="{ name: authRoute.name }" :class="{ 'hidden': route.name === authRoute.name }">{{ authRoute.text }}
                </RouterLink>
            </nav>
        </div>
    </div>
</template>

