<template>
    <div>
        <h1 class="title">Helldivers Ticketing</h1>



        <RouterLink to="/castle" class="fit-content main-menu-button">
            <EyeButton name="mainMenuEnter" color="GREEN" />
            <h2 class="main-menu-title">Enter</h2>
        </RouterLink>
        <RouterLink to="/options" class="fit-content main-menu-button">
            <EyeButton name="mainMenuOptions" color="GREEN" />
            <h2 class="main-menu-title">Options</h2>
        </RouterLink>
        <div @click="quitProgram" class="main-menu-button">
            <EyeButton name="mainMenuExit" color="GREEN" />
            <h2 class="main-menu-title">EXIT</h2>
        </div>



    </div>

</template>

<script setup>

import tButton from '../components/tButton.vue';
import EyeButton from '../components/EyeButton.vue';

const quitProgram = () => {
    window.generic.quitProgram()
}

</script>

<style scoped>
.title {
    padding: 20px
}

.main-menu-button {
    display: flex;
    flex-direction: row;
}

.main-menu-title {
    margin-top: auto;
    margin-bottom: auto;
}
</style>