<template>
    <div class="castle-main castle-bg">
        <h1 class="title">Helldivers Ticketing</h1>



        <RouterLink to="/castle" class="fit-content main-menu-button">
            <EyeButton name="mainMenuEnter" color="GREEN" />
            <h2 class="main-menu-title pointer-link">Enter</h2>
        </RouterLink>
        <RouterLink to="/options/mainMenu" class="fit-content main-menu-button">
            <EyeButton name="mainMenuOptions" color="GREEN" />
            <h2 class="main-menu-title pointer-link">Options</h2>
        </RouterLink>
        <RouterLink to="/documentation/mainMenu" class="fit-content main-menu-button">
            <EyeButton name="mainMenuOptions" color="GREEN" />
            <h2 class="main-menu-title pointer-link">Documentation</h2>
        </RouterLink>
        <div @click="importData" class="main-menu-button">
            <EyeButton name="mainMenuExit" color="GREEN" />
            <h2 class="main-menu-title pointer-link">Import archive</h2>
        </div>
        <div @click="exportData" class="main-menu-button">
            <EyeButton name="mainMenuExit" color="GREEN" />
            <h2 class="main-menu-title pointer-link">Export archive</h2>
        </div>
        <div @click="quitProgram" class="main-menu-button">
            <EyeButton name="mainMenuExit" color="GREEN" />
            <h2 class="main-menu-title pointer-link">EXIT</h2>
        </div>



    </div>

</template>

<script setup>

import EyeButton from '../components/EyeButton.vue';

import toast from '../misc/toast';

const quitProgram = () => {
    window.generic.quitProgram()
}

const exportData = async () => {
    if(await window.generic.exportData() != false){
        toast.toast('Your castle is ready to leave this wreched place behind')
    }else{
        toast.toast("The windows shed tears and the walls won't budge")
    }
}

const importData = async () => {
    if(await window.generic.importData() != false){
        toast.toast("You arrived.. maybe to home")
    }else{
        toast.toast("No... this is not the place")
    }
}

</script>

<style scoped>
.castle-bg {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;

}



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