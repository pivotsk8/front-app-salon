<script setup>
import AuthApi from '../../api/AuthApi'

const handleSubmit = async ({ password_confirm, ...data }) => {
    try {
        await AuthApi.register(data)
    } catch (error) {
        console.log(error)
    }
}
</script>


<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crear una cuenta</h1>
        <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

        <FormKit type="form" :actions="false" incomplete-message="No se puede enviar, revisar las notificaciones"
            @submit="handleSubmit">
            <FormKit type="text" label="Nombre" name="name" placeholder="Tu Nombre" validation="required|length:3"
                :validation-messages="{
                    required: 'El Nombre es obligatorio',
                    length: 'El nombre es muy corto'
                }" />

            <FormKit type="email" label="Email" name="email" placeholder="Email de registro" validation="required|email"
                :validation-messages="{
                    required: 'El Email es obligatorio',
                    email: 'Email no valido'
                }" />

            <FormKit type="password" label="Password" name="password" placeholder="Password de Ususario - Min 8 Caracteres"
                validation="required|length:8" :validation-messages="{
                    required: 'El Password es obligatorio',
                    length: 'El password debe contener al menos 8 caracteres'
                }" />

            <FormKit type="password" label="Repite el Password" name="password_confirm" placeholder="Repite el password"
                validation="required|confirm" :validation-messages="{
                    required: 'El Password es obligatorio',
                    confirm: 'Los password no son iguales'
                }" />

            <FormKit type="submit">Crear Cuenta</FormKit>
        </FormKit>

    </div>
</template>
