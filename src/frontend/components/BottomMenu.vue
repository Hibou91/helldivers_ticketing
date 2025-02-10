<template>
    <div class="bottom-menu-main">
        <div class="menu-frame">
            <div>
                <img src="../../../static/generic ui/bottom menu panel.png" class="menu-panel" alt="" srcset=""
                    width="250">
            </div>
            <div v-for="(button, index) in bottomMenuConfig[props.name].buttons" class="menu-long-frame-img"
                :style="`rotate: ${state.maxAngle - (index * state.distance)}deg; animation-duration: ${(index + 1) * 0.5}s;`"
                @mouseover="onHover = button.name" @mouseleave="onHover = ''">
                <div v-if="button.isRouterLink == true">
                    <RouterLink :to="button.to" class="relative ">
                        <img src="../../../static/buttons/eye button long bg yellow.png" alt="" srcset="" width="70" 
                            :class="{ 'menu-long-frame-img-bg': onHover == button.name }"
                            class="menu-long-frame-img-bg-default absolute">
                        <img :src="`../../../static/buttons/eye button long ${button.icon}.png`" alt="" srcset=""
                            width="70" class="absolute">
                        <img src="../../../static/buttons/eye button long frame.png" alt="" srcset="" width="70" >
                    </RouterLink>
                </div>
                <div v-else @click="clickValue = button.name">
                    <img src="../../../static/buttons/eye button long bg yellow.png" alt="" srcset="" width="70"
                        :class="{ 'menu-long-frame-img-bg': onHover == button.name }"
                        class="menu-long-frame-img-bg-default absolute" >
                    <img :src="`../../../static/buttons/eye button long ${button.icon}.png`" alt="" srcset=""
                        width="70" class="absolute">
                    <img src="../../../static/buttons/eye button long frame.png" alt="" srcset="" width="70">

                </div>


            </div>
            <div>
                <img src="../../../static/generic ui/bottom menu panel middle.png" class="menu-panel-middle" alt="" srcset=""
                    width="105">
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
    distance: 25,
})

state.value.maxAngle = (bottomMenuConfig[props.name + ''].buttons.length * state.value.distance) / 2 - 11






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
    left: calc(50% - 38px);
    bottom: 0;
    transform-origin: 50% 100%;
    animation: rotateIn 1.5s ease-in-out;
    height: 200px;
    overflow: hidden;
}

.menu-long-frame-img-bg-default {
    z-index: -10;
    filter: brightness(0.7);

}

.bottom-menu-main:hover .menu-long-frame-img-bg {

    filter: brightness(1);

}

.bottom-menu-main:active .menu-long-frame-img-bg {

    filter: brightness(1.3);

}

.menu-panel {
    position: absolute;
    left: calc(50% - 125px);
    bottom: 0;
}

.menu-panel-middle{
    position: absolute;
    left: calc(50% - 52px);
    bottom: 0;
}

@keyframes rotateIn {
    0% {
        transform: rotate(180deg);
    }
}

/* The element to apply the animation to */
</style>