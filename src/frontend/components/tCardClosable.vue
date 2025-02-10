<template>

    <tCard v-if="modalOpen == true">
        <div>
            <eyeButton name="closeModal" color="RED" @click="() => {closeModal()}" class="close-button"></eyeButton>

        </div>
        <div class="modal-slot">
            <slot>

            </slot>
        </div>

    </tCard>


</template>

<script setup>

import eyeButton from './EyeButton.vue';
import tCard from './tCard.vue';



const modalOpen = defineModel('modalOpen')
const props = defineProps(['closeMethod'])

const closeModal = () => {
    modalOpen.value = false;
    props.closeMethod()
}

</script>

<style scoped>
.close-button {
    float: right;
}

.modal-slot {
    margin-top: 80px;
}
</style>