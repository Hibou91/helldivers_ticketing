<template>

    <Locale :config="config"></Locale>
    

</template>

<script setup>

import Locale from '../components/Locale.vue';

const config = {
    name: "Garden",
    model: 'garden',
    category: "2",
}

</script>

<style scoped>

</style>