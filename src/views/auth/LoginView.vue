<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import AuthApi from '../../api/AuthApi'

const toast = inject('toast')
const router = useRouter()

const handleSubmit = async (formData) => {
    try {
        const { data: { token } } = await AuthApi.login(formData)
        localStorage.setItem('AUTH_TOKEN', token)
        router.push({ name: 'my-appointment' })
    } catch (error) {
        toast.open({
            message: error?.response?.data.msg,
            type: 'error'
        })
    }
}
</script>


<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
        <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

        <FormKit id="loginForm" type="form" :actions="false"
            incomplete-message="No se puede enviar, revisar las notificaciones" @submit="handleSubmit">

            <FormKit type="email" label="Email" name="email" placeholder="Email de usuario" validation="required|email"
                :validation-messages="{
                    required: 'El Email es obligatorio',
                    email: 'Email no valido'
                }" />

            <FormKit type="password" label="Password" name="password" placeholder="Password de Ususario - Min 8 Caracteres"
                validation="required" :validation-messages="{
                    required: 'El Password es obligatorio'
                }" />

            <FormKit type="submit">Iniciar Sesión</FormKit>
        </FormKit>

    </div>
</template>