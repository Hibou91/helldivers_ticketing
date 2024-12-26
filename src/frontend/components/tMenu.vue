<template>
    <div>
        
        <EyeButton @click="state.menuOpen = true" :name="menuName" color="GREEN"></EyeButton>



        <Transition name="menu-main">
            <div v-if="state.menuOpen == true" class="menu-main" @click="state.menuOpen = false">
                <slot>

                </slot>
                <tButton @click="state.menuOpen = false">Close</tButton>
            </div>
        </Transition>



    </div>
</template>

<script setup>

import tButton from './tButton.vue';
import EyeButton from './EyeButton.vue';

import { ref } from 'vue'

const state = ref({
    menuOpen: false,
    fading: false
})



defineProps(['menuName'])


</script>

<style scoped>
.menu-main {
    background-color: rgba(0, 0, 0, .7);
    width: 250px;
    height: calc(100vh - 40px);
    max-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
}

.menu-title{
    padding: 20px 0 20px 20px;
}

.menu-main-enter-active,
.menu-main-leave-active {
    transition: left 0.5s ease;
}

.menu-main-enter-from,
.menu-main-leave-to {
    left: -300px;
}
</style>