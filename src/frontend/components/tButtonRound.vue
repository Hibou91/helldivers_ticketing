<template>
    <div class="br-button-main relative" @mouseover="onHover = true" @mouseleave="onHover = false">
        
       
        <img v-if="color == 'GREEN'" src="../../../static/buttons/round_bg_green.png" alt="" srcset="" width="100" class="absolute button-image button-image-bg" >
        <img v-if="color == 'RED'" src="../../../static/buttons/round_bg_red.png" alt="" srcset="" width="100" class="absolute button-image button-image-bg" >
        <img v-if="color == 'YELLOW'" src="../../../static/buttons/round_bg_yellow.png" alt="" srcset="" width="100" class="absolute button-image button-image-bg" >
    
        <div class="absolute transitionable wh-full ">
            <p class="auto-margin br-button-text">
            
            <slot >

            </slot>
        </p>
        </div>
        
        <img src="../../../static/buttons/round_frame.png" alt="" srcset="" width="100"  class="absolute button-image" >
    </div>
</template>

<script setup>

import {ref} from 'vue'

defineProps(['color'])

const onHover = ref(false)
</script>

<style scoped>
.br-button-main {
    height: 100px;
    display: flex;
    align-items: center;
    width: 100px;
}

.button-image{
    top: 0;
    left: 0;
}

.br-button-text{
    font-size: 30px;
}

.button-main .button-image-bg{
    filter: brightness(0.7);
}

.button-main:hover .button-image-bg{
    filter: none;
}

.button-main:active .button-image-bg{
    filter: brightness(1.3);
}

.auto-margin{
    width: fit-content;
    margin: auto;
}

.wh-full{
    width: 100%;
    height: 100;
}

.visible{
    visibility: visible;
}

.invisible{
    visibility: hidden;
}
</style>
