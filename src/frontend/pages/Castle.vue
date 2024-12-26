<template>
    <div>
        <div class="castle-main castle-bg">
        </div>
        <Transition name="castle-bg">
            <div v-if="state.hover == 'LIBRARY'" class="castle-library castle-bg" id="CASTLE_LIBRARY">
            </div>
        </Transition>
        <Transition>
            <div v-if="state.hover == 'SALON'" class="castle-salon castle-bg" id="CASTLE_SALON">
            </div>
        </Transition>
        <Transition>
            <div v-if="state.hover == 'GARDEN'" class="castle-garden castle-bg" id="CASTLE_GARDEN">
            </div>
        </Transition>

        <tMenu menuName="Castle">

            <RouterLink to="/" class="fit-content">
                <tButton>back</tButton>
            </RouterLink>
            <RouterLink to="/library" @mouseover="state.hover = 'LIBRARY'; filcker()" @mouseleave="state.hover = '';"
                class="fit-content">
                <tButton>Library</tButton>
            </RouterLink>
            <RouterLink to="/garden" @mouseover="state.hover = 'GARDEN'; filcker()" @mouseleave="state.hover = ''"
                class="fit-content">
                <tButton>Garden</tButton>
            </RouterLink>
            <RouterLink to="/salon" @mouseover="state.hover = 'SALON'; filcker()" @mouseleave="state.hover = ''"
                class="fit-content">
                <tButton>Salon</tButton>
            </RouterLink>
        </tMenu>

        <BottomMenu></BottomMenu>


    </div>





</template>

<script setup>

import tButton from '../components/tButton.vue';
import tMenu from '../components/tMenu.vue';
import BottomMenu from '../components/BottomMenu.vue';

import { ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const state = ref({
    hover: '',
    menuOpen: false
})

const filcker = () => {

    if (state.value.hover == '') {
        return;
    }

    if (document.querySelector(`#CASTLE_${state.value.hover}`)) {
        document.querySelector(`#CASTLE_${state.value.hover}`).style.opacity = Math.random() + 0.2;
    }

    setTimeout(filcker, Math.random() * 900)
}

onBeforeRouteLeave((to, from) => {
    state.value.hover = '';
})



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

.castle-main {
    background-image: url("./static/castle/castle.jpg");
    z-index: -10;
}

.castle-library {
    background-image: url("./static/castle/castle library.png");
    z-index: -9;
    transition: opacity 0.3s ease;
}

.castle-salon {
    background-image: url("./static/castle/castle salon.png");
    z-index: -9;
    transition: opacity 0.3s ease;
}

.castle-garden {
    background-image: url("./static/castle/castle garden.png");
    z-index: -9;
    transition: opacity 0.3s ease;
}

.castle-bg-enter-active,
.castle-bg-leave-active {
    transition: opacity 0.5s ease;
}

.castle-bg-enter-from,
.castle-bg-leave-to {
    opacity: 0;
}
</style>