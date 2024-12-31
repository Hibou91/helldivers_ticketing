<template>
    <div class="bottom-menu-main">
        <div class="menu-frame">

            <div v-for="(button, index) in bottomMenuConfig[props.name].buttons" class="menu-long-frame-img"
                :style="`rotate: ${state.maxAngle - (index * state.distance)}deg; animation-duration: ${(index + 1) * 0.5}s;`"
                @mouseover="onHover = button.name" @mouseleave="onHover = ''" >
                <div v-if="button.isRouterLink == true">
                    <RouterLink :to="button.to" class="relative">
                        <img src="../../../static/buttons/eye button long frame.png" alt="" srcset="" width="100"
                            class="absolute">
                        <img :src="`../../../static/buttons/eye button long ${button.icon}.png`" alt="" srcset=""
                            width="100" :class="{ 'absolute': onHover == button.name }">
                        <img src="../../../static/buttons/eye button long bg.png" alt="" srcset="" width="100"
                            v-if="onHover == button.name">
                    </RouterLink>
                </div>
                <div v-else>
                    <img src="../../../static/buttons/eye button long frame.png" alt="" srcset="" width="100"
                        class="absolute" @click="clickValue = button.name">
                    <img :src="`../../../static/buttons/eye button long ${button.icon}.png`" alt="" srcset=""
                        width="100" :class="{ 'absolute': onHover == button.name }">
                    <img src="../../../static/buttons/eye button long bg.png" alt="" srcset="" width="100"
                        v-if="onHover == button.name">
                </div>


            </div>
            <div>
                <img src="../../../static/buttons/bottom menu panel.png" class="menu-panel" alt="" srcset=""
                    width="300">
            </div>


        </div>

    </div>
</template>

<script setup>


import bottomMenuConfig from '../misc/bottomMenuConfig';
import { ref } from 'vue'

const props = defineProps(['name'])
const onHover = defineModel('onHover')
const clickValue = defineModel('clickValue')

const state = ref({
    distance: 20,
})

state.value.maxAngle = (bottomMenuConfig[props.name + ''].buttons.length * state.value.distance) / 2 - 8






</script>

<style scoped>
.bottom-menu-main {
    position: fixed;
    width: 100Vw;
    bottom: 0;
}

.menu-frame {
    position: relative;
    width: 100%;
    height: 100%;
}

.menu-long-frame-img {
    position: absolute;
    left: calc(50% - 50px);
    bottom: 0;
    transform-origin: 50% 100%;
    animation: rotateIn 1.5s ease-in-out;
    z-index: 5;
}

.menu-panel {
    position: absolute;
    left: calc(50% - 145px);
    bottom: 0;
    z-index: 10;
}

@keyframes rotateIn {
    0% {
        transform: rotate(180deg);
    }
}

/* The element to apply the animation to */
</style>