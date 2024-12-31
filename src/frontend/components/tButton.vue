<template>
    <div class="button-main relative" @mouseover="onHover = true" @mouseleave="onHover = false">
        
       
        <img src="../../../static/buttons/button standard bg.png" alt="" srcset="" width="150" class="absolute button-image" :class="{invisible: onHover == false, visible: onHover == true}">
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
}

.button-image{
    top: 0;
    left: 0;
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
