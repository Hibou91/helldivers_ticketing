<template>
    <div class="button-main relative" @mouseover="onHover = true" @mouseleave="onHover = false">
        
       
        <img src="../../../static/buttons/button standard bg red.png" alt="" srcset="" width="150" class="absolute button-image button-image-bg" >
    
        <div class="absolute transitionable width-100">
            <p class="auto-margin">
            
            <slot >

            </slot>
        </p>
        </div>
        
        <img src="../../../static/buttons/button standard.png" alt="" srcset="" width="150"  class="absolute button-image" >
    </div>
</template>

<script setup>

import {ref} from 'vue'

const onHover = ref(false)
</script>

<style scoped>
.button-main {
    height: 60px;
    display: flex;
    align-items: center;
    width: 150px;
    left: -10px;
}

.button-image{
    top: 0;
    left: 0;
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

.width-100{
    width: 100%;
}

.visible{
    visibility: visible;
}

.invisible{
    visibility: hidden;
}
</style>
