<script setup>
import { onMounted, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import AuthApi from '../../api/AuthApi';

const toast = inject('toast')
const route = useRoute()
const { token } = route.params

const validToken = ref(false)


onMounted(async () => {
    try {
        const { data } = await AuthApi.verifyPasswordResetToken(token)
        validToken.value = true
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: "error",
        })
    }
})
</script>

<template>
    <div>
        <div v-if="validToken">
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
        <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
    </div>
</template>
