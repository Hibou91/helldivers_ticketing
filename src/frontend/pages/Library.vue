<template>

    <Locale :config="config"></Locale>
    

</template>

<script setup>

import Locale from '../components/Locale.vue';

const config = {
    name: "Library",
    model: 'library',
    category: "0",
}

</script>

<style scoped>

</style>