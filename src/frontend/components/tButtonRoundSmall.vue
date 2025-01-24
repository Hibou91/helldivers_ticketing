<template>
    <div class="br-button-main  relative" :class="{'br-button-main-hover': !(icon == true)}" @mouseover="onHover = true" @mouseleave="onHover = false">
        
       
        <img v-if="color == 'GREEN'" src="../../../static/buttons/round bg green.png" alt="" srcset="" width="50" class="absolute button-image button-image-bg" >
        <img v-if="color == 'RED'" src="../../../static/buttons/round bg red.png" alt="" srcset="" width="50" class="absolute button-image button-image-bg" >
        <img v-if="color == 'YELLOW'" src="../../../static/buttons/round bg yellow.png" alt="" srcset="" width="50" class="absolute button-image button-image-bg" >
    
        <div class="absolute transitionable wh-full ">
            <p class="auto-margin br-button-text">
            
            <slot >

            </slot>
        </p>
        </div>
        
        <img src="../../../static/buttons/round frame.png" alt="" srcset="" width="50"  class="absolute button-image" >
    </div>
</template>

<script setup>

import {ref} from 'vue'

defineProps(['color', 'icon'])

const onHover = ref(false)
</script>

<style scoped>
.br-button-main {
    height: 50px;
    display: flex;
    align-items: center;
    width: 50px;
}

.button-image{
    top: 0;
    left: 0;
}


.br-button-main-hover .button-image-bg{
    filter: brightness(0.7);
}

.br-button-main-hover:hover .button-image-bg{
    filter: none;
}

.br-button-main-hover:active .button-image-bg{
    filter: brightness(1.3);
}

.auto-margin{
    width: fit-content;
    margin: auto;
}

.wh-full{
    width: 100%;
    height: 50;
}

.visible{
    visibility: visible;
}

.invisible{
    visibility: hidden;
}
</style>
