<template>

    <div class="tCardHolder" v-if="openPanel == true">

        <TCardClosable v-model:modalOpen="openPanel" :closeMethod="() => { }">
            <div class="modal-form">


                <div class="scavenge-holder">
                    <div v-for="(category, index) in state.categories" v-bind:key="category.id"
                        class="scavenge-data-main ">
                        <div class="scavenge-data-image">
                            <img src="../../../static/icons/scrolls/scroll frame.png" alt="" width="100" height="100"
                                class="scavenge-data-main" :style="`filter:hue-rotate(${category.color}deg);`">
                            <img src="../../../static/icons/scrolls/scroll.png" alt="" width="100" height="100"
                                class="scavenge-data-addons">
                            <img src="../../../static/icons/scrolls/seal red.png" alt="" width="100" height="100"
                                class="scavenge-data-addons">
                        </div>
                        <div class="questCategory-data pointer-link"
                            :style="`filter:hue-rotate(${category.color}deg);`">
                            <div :style="`filter:hue-rotate(${360 - category.color}deg);`">
                                <div class="flex-row">
                                    <div class="flex-col">
                                        
                                        <input type="text" v-model="category.name" />
                                        <input type="range" min="0" max="360" v-model="category.color" />
                                    </div>
                                    <tButtonRoundSmall color="YELLOW" @click="() => {putCategory(category)}" class="ml-10">Save</tButtonRoundSmall >
                                    <tButtonRoundSmall color="RED" @click="() => {deleteCategory(category.id, index)}" class="ml-10">Delete</tButtonRoundSmall >
                                </div>
                                
                                
                            </div>

                        </div>

                    </div>
                    <div class="scavenge-data-main ">
                        <div class="scavenge-data-image">
                            <img src="../../../static/icons/scrolls/scroll frame.png" alt="" width="100" height="100"
                                class="scavenge-data-main" :style="`filter:hue-rotate(${state.newCategory.color}deg);`">
                            <img src="../../../static/icons/scrolls/scroll.png" alt="" width="100" height="100"
                                class="scavenge-data-addons">
                            <img src="../../../static/icons/scrolls/seal red.png" alt="" width="100" height="100"
                                class="scavenge-data-addons">
                        </div>
                        <div class="questCategory-data pointer-link"
                            :style="`filter:hue-rotate(${state.newCategory.color}deg);`">
                            <div :style="`filter:hue-rotate(${360 - state.newCategory.color}deg);`">
                                <div class="flex-row">
                                    <div class="flex-col">
                                        <input type="text" v-model="state.newCategory.name" />
                                        <input type="range" min="0" max="360" v-model="state.newCategory.color" />
                                    </div>
                                    <tButtonRoundSmall color="YELLOW" @click="postCategory" class="ml-10">Save</tButtonRoundSmall >
                                </div>
                                
                                
                            </div>

                        </div>

                    </div>


                </div>
            </div>

        </TCardClosable>





    </div>
</template>

<script setup>
import TCardClosable from './tCardClosable.vue'
import tCard from './tCard.vue'
import tButton from './tButton.vue'
import tButtonRoundSmall from './tButtonRoundSmall.vue'

import { ref, onMounted } from 'vue'



const openPanel = defineModel('openPanel')
const props = defineProps(['category'])

const state = ref({
    categories: [],
    newCategory: {
        id:0,
        name: "",
        color: 0,
    }
})



onMounted(() => {
    getCategories()
})

const getCategories = async () => {

    let rawData = await window.localeUtils.getQuestCategoryData(props.category)
    state.value.categories = rawData


}

const postCategory = async () => {
    let rawData = await window.localeUtils.postQuestCategoryData(props.category, JSON.stringify(state.value.newCategory))
    if(rawData != false){
        state.value.categories.push({
            id: rawData.id,
            name: state.value.newCategory.name,
            color: state.value.newCategory.color
        })
        state.value.newCategory.name = ''
        state.value.newCategory.color = 0
        state.value.newCategory.id = 0
    }

}

const putCategory = async (data) => {
    let rawData = await window.localeUtils.putQuestCategoryData(props.category, data.id, JSON.stringify(data))

}

const deleteCategory = async (id, index) => {
    let rawData = await window.localeUtils.deleteQuestCategoryData(props.category,id)
    if(rawData == true){
        state.value.categories.splice(index, 1)
    }

}

//utils






</script>

<style>
.tCardHolder {
    display: flex;
    flex-direction: row;
    max-height: calc(100% - 350px);
    height: calc(100% - 350px);
    overflow-y: visible;
    min-height: 0;
}

.tCardHolderRow {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.modal-form {
    margin-bottom: 20px;
}

.scavenge-bg {
    width: calc(100% - 80px - 100px);
    ;
    height: calc(100% - 80px);
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 40px;
    left: 40px;

}

.ml-10{
    margin: auto 0 auto 20px;
}


.scavenge-bg-enter-active,
.scavenge-bg-leave-active {
    transition: opacity 0.5s ease;
}

.scavenge-bg-enter-from,
.scavenge-bg-leave-to {
    opacity: 0;
}

.scavenge-holder {
    margin: 20px;
    background-color: rgba(0, 0, 0, .7);
    min-width: 0;
    min-height: 0;
    max-width: calc(100% - 40px);
    width: 100%;
    height: calc(100% - 40px);
    max-height: calc(100% - 40px);
    transition: width 0.5 ease;
    overflow-y: auto;
}

.questCategory-data {
    height: calc(100px - ( 2 * 13px));
    width: calc(100% - 26px);
    background-image: url("./static/icons/scrolls/scroll frame fade.png");
    background-repeat: no-repeat;
    background-size: 600px 100px;
    padding: 13px;
}

.scavenge-data-main {

    display: flex;
    flex-direction: row;

}

.scavenge-data-image {
    position: relative;
    width: fit-content;

}

.scavenge-data-addons {
    position: absolute;
    top: 0;
    left: 0;
}
</style>