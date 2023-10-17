<script setup>

</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nuevo Password</h1>
        <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>

        <FormKit id="newPasswordForm" type="form" :actions="false"
            incomplete-message="No se puede enviar, revisa las notificaciones" @submit="handleSubmit">

            <FormKit type="password" label="Repite el Password" name="password_confirm" placeholder="Repite el password"
                validation="required|confirm" :validation-messages="{
                    required: 'El Password es obligatorio',
                    confirm: 'Los password no son iguales'
                }" />

            <FormKit type="submit">Guardar Password</FormKit>
        </FormKit>
    </div>
</template>
