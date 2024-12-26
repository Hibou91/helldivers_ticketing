<template>

    <div v-if="modalOpen == true" class="frame">
        <div>
            <eyeButton name="closeModal" color="RED" @click="modalOpen = false" class="close-button"></eyeButton>

        </div>
        <div class="modal-slot">
            <slot>

            </slot>

        </div>



    </div>
</template>

<script setup>

import eyeButton from './EyeButton.vue';



const modalOpen = defineModel('modalOpen')

</script>

<style scoped>
.frame {

    position: absolute;
    width: 500px;
    height: 500px;
    margin: 20px;
    background-color: rgba(0, 0, 0, .7);
    padding: 20px;
    border-radius: 20px;
    left: calc(50% - 250px);
    top: calc(50% - 250px);
}

.close-button {
    float: right;
}

.modal-slot {
    margin-top: 100px;
}
</style>