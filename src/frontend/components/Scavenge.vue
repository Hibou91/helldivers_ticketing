<template>

    <div class="tCardHolder" v-if="openPanel == true">

        <TCardClosable v-model:modalOpen="openPanel" :closeMethod="() => { }">
            <div class="modal-form">


                <div class="scavenge-main scavenge-bg">
                </div>
                <Transition name="scavenge-bg">
                    <div v-if="state.hover == 'DUNGEONS'" class="scavenge-dungeons scavenge-bg" id="SCAVENGE_DUNGEONS">
                    </div>
                </Transition>
                <Transition>
                    <div v-if="state.hover == 'FOREST'" class="scavenge-forest scavenge-bg" id="SCAVENGE_FOREST">
                    </div>
                </Transition>
                <Transition>
                    <div v-if="state.hover == 'VILLAGE'" class="scavenge-village scavenge-bg" id="SCAVENGE_VILLAGE">
                    </div>
                </Transition>
            </div>

        </TCardClosable>

        <div class="tCardHolderRow">
            <div class="scavenge-holder">
                <div v-for="scavenge in state.generatedScavenges" v-bind:key="scavenge.id"
                    @mouseover="state.hover = scavenge.typeModel" @mouseleave="state.hover = ''" class="scavenge-data-main ">
                    <div class="scavenge-data-image" >
                        <img src="../../../static/icons/scrolls/scroll frame.png" alt="" width="100" height="100"
                            class="scavenge-data-main">
                        <tButtonRound class="scavenge-data-addons" :color="calculateDifficulty(scavenge.successRate)"> {{ scavenge.successRate }}</tButtonRound>
                        
                    </div>
                    <div class="scavenge-data pointer-link" >
                        
                            {{ scavenge.targetName }} quest in the {{ scavenge.typeName }}
                        <tButton >Start </tButton>
                    </div>
                    
                </div>


            </div>

            <tCard>


            </tCard>

        </div>



    </div>
</template>

<script setup>
import TCardClosable from './tCardClosable.vue'
import tCard from './tCard.vue'
import tButton from './tButton.vue'
import tButtonRed from './tButtonRed.vue'
import tButtonRound from './tButtonRound.vue'

import { ref, onMounted, watch } from 'vue'
import TButtonRound from './tButtonRound.vue'


const openPanel = defineModel('openPanel')
const props = defineProps(['category'])

const state = ref({
    generatedScavenges: [],
    scavengeAction: '',
    hover: '',
})



onMounted(() => {
    generateScavenge()
})

const generateScavenge = async () => {

    let rawData = await window.keeperUtils.generateScavenges(props.category)
    console.log(rawData);
    state.value.generatedScavenges = rawData.scavenges
    state.value.scavengeAction = rawData.action
    console.log(state.value.generatedScavenges);
    

}

const calculateDifficulty = (successRate) => {
    if(successRate < 33){
        return "RED"
    }else if(successRate > 33 && successRate < 66){
        return "YELLOW"
    }else{
        return "GREEN"
    }
}

const filcker = () => {

    if (state.value.hover == '') {
        return;
    }

    if (document.querySelector(`#SCAVENGE_${state.value.hover}`)) {
        document.querySelector(`#SCAVENGE_${state.value.hover}`).style.opacity = Math.random() + 0.2;
    }

    setTimeout(filcker, Math.random() * 900)
}



watch(() => state.value.hover, (newValue) => {

    if (newValue != '') {
        filcker();

    }

})




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

.scavenge-main {
    background-image: url("./static/scavenge/main map.png");
    z-index: 9;
}

.scavenge-dungeons {
    background-image: url("./static/scavenge/map dungeons.png");
    z-index: 10;
    transition: opacity 0.3s ease;
}

.scavenge-forest {
    background-image: url("./static/scavenge/map forest.png");
    z-index: 10;
    transition: opacity 0.3s ease;
}

.scavenge-village {
    background-image: url("./static/scavenge/map village.png");
    z-index: 10;
    transition: opacity 0.3s ease;
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

.scavenge-data {
    height: 60px;
    width: calc(100% - 40px);
    background-image: url("./static/icons/scrolls/scroll frame fade.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding: 20px;
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