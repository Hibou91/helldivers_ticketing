<template>
    <div class="frame">
        <tCard v-if="modalOpen == true" class="modal">
            <div>
                <eyeButton name="closeModal" color="RED" @click="modalOpen = false" class="close-button"></eyeButton>

            </div>
            <div class="modal-slot">
                <slot>

                </slot>
            </div>

        </tCard>

    </div>






</template>

<script setup>

import eyeButton from './EyeButton.vue';
import tCard from './tCard.vue';



const modalOpen = defineModel('modalOpen')

</script>

<style scoped>
.frame {

    position: absolute;
    display: flex;
   width: calc(100% - 40px);
   max-height: calc(100% - 40px - 250px);
   height: calc(100% - 40px - 250px);
   padding: 20px;
}

.modal{
    width: fit-content;
    
    margin: auto;
    flex-grow: 1;
    min-height: 0;
    max-height: 100%;

}

.close-button {
    float: right;
}

.modal-slot {
    margin-top: 100px;
}
</style>