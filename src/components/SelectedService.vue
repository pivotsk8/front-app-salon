<script setup>
defineProps({
    service: {
        type: Object
    }

})
</script>

<template>
    <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center">
        <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
        <p class="text-3xl font-black text-blue-50">{{ service.name }}</p>
    </div>
</template>

