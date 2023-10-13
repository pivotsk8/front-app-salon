
<script setup>

</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvide mi password</h1>
        <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>

        <FormKit id="loginForm" type="form" :actions="false"
            incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">

            <FormKit type="email" label="Email" name="email" placeholder="Email de Usuario" validation="requires|email"
                :validation-messages="{
                    required: 'El Nombre es obligatorio',
                    email: 'Ingresa un correo valido'
                }" />

            <FormKit type="submit">Enviar Instrucciones</FormKit>
        </FormKit>
    </div>
</template>

