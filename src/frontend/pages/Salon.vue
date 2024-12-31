<template>

    <Locale :config="config"></Locale>
    

</template>

<script setup>

import Locale from '../components/Locale.vue';

const config = {
    name: "Salon",
    model: 'salon',
    category: "1",
}

</script>

<style scoped>

</style>